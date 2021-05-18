export default async (req, res) => {
  const { id } = req.query;

  const API_ENDPOINT = `https://sports-api.cloudbet.com/pub/v2/odds/events/${id}?markets=basketball.moneyline&markets=basketball.handicap&markets=basketball.totals`;

  const response = await fetch(API_ENDPOINT, {
    headers: new Headers({
      'Content-Type': 'application/json',
      'X-API-Key': process.env.CLOUDBET_API_KEY,
    }),
  });
  const data = await response.json();

  res.status(200).json({ data: data });
};
