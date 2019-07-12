const sillyId = require("sillyid");

exports.getGamerTag = () => {
    const order = [
        { type: "adj", letter: "*" },
        { type: "noun", letter: "*" }
    ];

    const gamertag = new sillyId(order);

    return gamertag.generate();
}