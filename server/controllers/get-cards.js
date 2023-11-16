import mtg from 'mtgsdk'

const GetCards = async ({
  searchKeyword,
  limit
}) => {
  console.log('\n\n', {
    searchKeyword,
    limit
  })

  let requestObj = {}
  if (searchKeyword) requestObj = { ...requestObj, name: searchKeyword }
  if (limit) requestObj = { ...requestObj, pageSize: limit }

  const cards = await mtg.card.where(requestObj)
  
  return {
    cards,
    total: 100
  };
};

export default GetCards;
