/* SELECTORS */

export const getAllTrips = ({trips}) => trips;

export const getFilteredTrips = ({trips, filters}) => {
  let output = trips;

  // filter by search phrase
  if(filters.searchPhrase){
    
    const pattern = new RegExp(filters.searchPhrase, 'i');
    output = output.filter(trip => pattern.test(trip.name));
  }

  // TODO - filter by duration - DONE
  // filter by duration
  output = output.filter(trip => trip.days >= filters.duration.from && trip.days <= filters.duration.to);

  // TODO - filter by tags - DONE
  if (filters.tags) (
    output = output.filter(trip => filters.tags.every(tag => trip.tags.indexOf(tag) > -1))
  );

  // TODO - sort by cost descending (most expensive goes first)
  output = output.sort((a, b)=>{
    const slicedA = parseFloat(a.cost.slice(1).replace(',', ''));
    const slicedB = parseFloat(b.cost.slice(1).replace(',', ''));
    return slicedB - slicedA;
  });
  return output;
  
};


export const getTripById = ({trips}, tripId) => {
  // let filtered = trips;

  // TODO - filter trips by tripId - DONE
  const filtered = trips.filter(trip => trip.id === tripId);
  
  return filtered.length ? filtered[0] : {error: true};
};

export const getTripsForCountry = ({trips}, countryCode) => {
  // let filtered = trips;

  // TODO - filter trips by countryCode - DONE
  const filtered = trips.filter(trip => trip.country.code === countryCode);
  
  return filtered.length ? filtered : [{error: true}];
};

/* ACTIONS */

/*
// action name creator
const reducerName = 'trips';
const createActionName = name => `app/${reducerName}/${name}`;

// action types


// action creators


// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    default:
      return statePart;
  }
}
 */
