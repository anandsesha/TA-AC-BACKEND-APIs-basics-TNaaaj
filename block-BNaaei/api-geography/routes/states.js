var express = require('express');
var statesRouter = express.Router(); // for /api/v1/states
const State = require('../models/State');

// GET /api/v1/states/population/asc - list all states in ascending order of their population
statesRouter.get('/population/asc', async (req, res) => {
  try {
    const states = await State.find().sort({ population: 1 });
    res.json({ states });
  } catch (error) {
    console.error(
      'Error fetching states in ascending order of population:',
      error
    );
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/v1/states/:stateId/neighbours - list all neighboring states for a particular state
statesRouter.get('/:stateId/neighbours', async (req, res) => {
  const stateId = req.params.stateId;

  try {
    // Find the particular state and populate the neighboring_states field
    const state = await State.findById(stateId)
      .populate('neighbouring_states')
      .exec();

    if (!state) {
      return res.status(404).json({ message: 'State not found' });
    }

    // Extract the neighboring states from the populated field
    const neighbouringStates = state.neighbouring_states;

    res.json({ neighbouringStates });
  } catch (error) {
    console.error('Error fetching neighboring states for a state:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Now, update a state in a country model, then the state in state model also has to change populate.

// PUT /api/v1/states/:stateId - update a state
statesRouter.put('/:stateId', async (req, res) => {
  const stateId = req.params.stateId;

  try {
    const updatedState = await State.findByIdAndUpdate(stateId, req.body, {
      new: true,
    });

    if (!updatedState) {
      return res.status(404).json({ message: 'State not found' });
    }

    await Country.findOneAndUpdate(
      { states: stateId },
      { states: updatedState._id }
    );

    res.json(updatedState);
  } catch (error) {
    console.error('Error updating a state:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE /api/v1/states/:stateId - remove a state
statesRouter.delete('/:stateId', async (req, res) => {
  const stateId = req.params.stateId;

  try {
    var removedState = await State.findByIdAndRemove(stateId);

    if (!removedState) {
      return res.status(404).json({ message: 'State not found' });
    }

    // Remove the state reference from the corresponding Country model
    await Country.findOneAndUpdate(
      { states: stateId },
      { $pull: { states: removedState._id } }
    );

    res.json({ msg: 'State Removed Successfully' });
  } catch (error) {
    console.error('Error removing a state:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = statesRouter;
