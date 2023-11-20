Express API Server for Countries and States:

1. Country Schema:

Name
States (ObjectIds)
Continent
Population
Ethnicity (Religions)
Neighbouring Countries (ObjectIds)
Area

Countries Endpoints:

- List all countries in ascending/descending order.
- Update/Delete a country.

2. State Schema:

Name of State
Country (ObjectId)
Population
Area
Neighbouring States (State ObjectIds)

States Endpoints:

- List all states for a country in ascending/descending order.
- List all states in ascending order of their population.
- For a particular state, list all neighbouring states.

* General Endpoints:

- List all religions present in the entire dataset. --> (Model.distinct('ethnicity'))
- List countries based on religions, continent, and population.
- Update/Remove a state from any country.

Also, Handeled:

- update a state in a country model, then the state in state model also has to change "populate", $pull, $push.
