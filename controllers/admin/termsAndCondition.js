const terms = require('../../model/privacy')
exports.addterms = async (req, res) => {
    try {
        const termsData = await terms.create({ terms: req.body.terms, type: "term" });
        res.status(200).json({
            // data : policyData,
            message: "  terms Added ",
            details: termsData
        })
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message })
    }
}
exports.updateterms = async (req, res) => {
    try {

        const UpdatedTerms = await terms.findOneAndUpdate({ _id: req.params.id }, {
            terms: req.body.terms
        })//.exec();
        console.log(UpdatedTerms);
        return res.status(200).json({
            message: "Terms Update", data: UpdatedTerms
        })


    } catch (err) {
        console.log(err)
        return res.status(401).json({
            mesage: err.mesage
        })
    }
}
exports.DeleteTerms = async (req, res) => {
    try {
        const id = req.params.id;
        await terms.deleteOne({ _id: id });
        res.status(200).send({ message: "Terms deleted " })
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message })
    }
}
exports.getAllterms = async (req, res) => {
    try {
        const data = await terms.find({ type: "term" });
        console.log(data);
        return res.status(200).json({
            terms: data
        })

    } catch (err) {
        res.status(400).send({ mesage: err.mesage });
    }
}
