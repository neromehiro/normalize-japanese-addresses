const { normalize } = require('@geolonia/normalize-japanese-addresses');

module.exports = async (req, res) => {
  const { address, level } = req.query;

  if (!address) {
    res.status(400).json({ error: 'Address is required' });
    return;
  }

  try {
    const result = await normalize(address, { level: level ? parseInt(level) : undefined });
    res.status(200).json(result);
  } catch (error) {
    console.error('Error normalizing address:', error); // エラーログを追加
    res.status(500).json({ error: error.message });
  }
};
