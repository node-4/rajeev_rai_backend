const AllotedSites = require("../../model/allotedSites");

// CREATE (POST)
module.exports.createAllotedSites = async (req, res) => {
  try {
    const newSite = new AllotedSites(req.body);
    const savedSite = await newSite.save();
    res.status(201).json(savedSite);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// // READ (GET)
// router.get("/", async (req, res) => {
//   try {
//     const sites = await AllotedSites.find();
//     res.json(sites);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // UPDATE (PUT)
// router.put("/:id", async (req, res) => {
//   try {
//     const site = await AllotedSites.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json(site);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // DELETE
// router.delete("/:id", async (req, res) => {
//   try {
//     await AllotedSites.findByIdAndDelete(req.params.id);
//     res.json({ message: "Site deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;
