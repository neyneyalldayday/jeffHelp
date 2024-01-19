const { Post } = require('../models');

const postData = [
{
    title: "the great foot",
    content: `In the silence of the night, unseen footsteps echo with a haunting cadence, as shadows beneath the feet whisper tales of forgotten souls. A chilling breeze carries the weight of untold secrets, stirring the very ground beneath, as if the earth itself shudders at the impending march of spectral soles`,
    userId: 1
},
{
    title: "the great face",
    content: `Faces obscured in the dim glow of twilight bear the haunting etchings of forgotten nightmares, each wrinkle a chapter of ancient sorrow waiting to be unveiled. In the shadows, masks of stoic facade conceal the abyss within, where the eyes harbor a darkness that mirrors the unfathomable depths of a forgotten abyss.`,
    userId: 2
},
{
    title: "the great fungus",
    content: `Beneath the veil of decaying foliage, an ominous fungus sprawls, its mycelium weaving a sinister network that whispers secrets to the earth. As the fungal tendrils slither through the soil, a silent pact with nature unfolds, promising a symbiosis that carries an eerie undertone of unseen consequences.`,
    userId: 3
},
{
    title: "the great hotdog",
    content: `In the sizzling embrace of the grill, hot dogs contort into sinister forms, their charred exteriors concealing a mystery that grins beneath the bun. A spectral aroma wafts through the air, as if the very essence of their creation holds a pact with the culinary shadows, imparting an ominous flavor to those who dare to indulge.`,
    userId: 4
},
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;