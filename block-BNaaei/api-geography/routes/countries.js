var express = require('express');
var countriesRouter = express.Router(); // for /api/v1/countries
const Country = require('../models/Country');

// GET /api/v1/countries/asc - list all countries in ascending order
countriesRouter.get('/asc', async (req, res) => {
  try {
    const countries = await Country.find({}).sort({ name: 1 });
    res.json({ countries });
  } catch (error) {
    console.error('Error fetching countries in ascending order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/v1/countries/desc - list all countries in descending order
countriesRouter.get('/desc', async (req, res) => {
  try {
    const countries = await Country.find({}).sort({ name: -1 });
    res.json({ countries });
  } catch (error) {
    console.error('Error fetching countries in descending order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// UPDATE a country
// PUT /api/v1/countries/:id
countriesRouter.put('/:id', async (req, res) => {
  const countryId = req.params.id;

  try {
    const updatedCountry = await Country.findByIdAndUpdate(
      countryId,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedCountry) {
      return res.status(404).json({ message: 'Country not found' });
    }

    // Update that country from the neighbouring countries array as well
    await Country.updateMany(
      { neighbouring_countries: countryId },
      { $push: { neighbouring_countries: countryId } }
    );

    res.json(updatedCountry);
  } catch (error) {
    console.error('Error updating country:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE a country
// DELETE /api/v1/countries/:id
countriesRouter.delete('/:id', async (req, res) => {
  const countryId = req.params.id;

  try {
    const deletedCountry = await Country.findByIdAndRemove(countryId);

    if (!deletedCountry) {
      return res.status(404).json({ message: 'Country not found' });
    }

    // Remove that country from the neighbouring countries array as well
    await Country.updateMany(
      { neighbouring_countries: countryId },
      { $pull: { neighbouring_countries: countryId } }
    );

    res.json({
      message:
        'Country deleted successfully AND removed from neighbouring countries list as well',
    });
  } catch (error) {
    console.error('Error deleting country:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/v1/countries/:countryId/states - list all states for a country in ascending order
countriesRouter.get('/:countryId/asc', async (req, res) => {
  const countryId = req.params.countryId;

  try {
    var states = await State.find({ country: countryId }).sort({ name: 1 });
    res.json({ states });
  } catch (error) {
    console.error(
      'Error fetching states for a country in ascending order:',
      error
    );
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Similarly, GET /api/countries/:countryId/states - list all states for a country in descending order

// GET /api/v1/countries/:countryid/neighbours - list all neighboring countries for a particular country
countriesRouter.get('/:countryid/neighbours', async (req, res) => {
  const countryId = req.params.countryid;

  try {
    // Find the particular country and populate the neighbouring_countries field
    var country = await Country.findById(countryId)
      .populate('neighbouring_countries')
      .exec();

    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }

    // Extract the neighboring country from the populated field
    const neighbouringCountries = country.neighbouring_countries;

    res.json({ neighbouring_countries });
  } catch (error) {
    console.error('Error fetching neighboring countries for a country:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/v1/countries/religions - list all religions present in the entire country dataset
countriesRouter.get('/religions', async (req, res) => {
  try {
    // Use the distinct method to get unique religions from all countries
    const uniqueReligions = await Country.distinct('ethnicity');

    res.json({ religions: uniqueReligions });
  } catch (error) {
    console.error(
      'Error fetching religions from the entire country dataset:',
      error
    );
    res.status(500).json({ message: 'Internal server error' });
  }
});
// Output
// {
//   "religions": ["Christianity", "Islam", "Hinduism", "Buddhism"]
// }

// GET /api/v1/countries/religions/:religion - list countries based on a specific religion
countriesRouter.get('/religions/:religion', async (req, res) => {
  const religion = req.params.religion;

  try {
    const countries = await Country.find({ ethnicity: religion });
    res.json({ countries });
  } catch (error) {
    console.error(
      `Error fetching countries based on religion ${religion}:`,
      error
    );
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Similarly for List countries based on continent: Country.find({ continent });

//Similarly, List countries based on population
countriesRouter.get('/population/asc', async (req, res) => {
  try {
    const countries = await Country.find().sort({ population: 1 });
    res.json({ countries });
  } catch (error) {
    console.error(
      'Error fetching countries based on population in ascending order:',
      error
    );
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Similarly for desc population

module.exports = countriesRouter;
