export default async (req, res) => {
  const response = await fetch(
    'https://sports-api.cloudbet.com/pub/v2/odds/competitions/basketball-usa-nba?markets=basketball.moneyline',
    {
      headers: new Headers({
        'Content-Type': 'application/json',
        'X-API-Key': process.env.CLOUDBET_API_KEY,
      }),
    }
  );

  const data = await response.json();
  const events = data.events.filter(
    event => Object.keys(event.markets).length !== 0
  );

  res.status(200).json({ data: events });
};
