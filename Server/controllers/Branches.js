
var Branch = require('../models/Branch');

exports.getAllBranches = function (req, res) {
    branches = [{
        id:1,
        title: "Tel Aviv",
        lat: 33,
        long: 33
    },{
        id:2,
        title: "Ramat Gan",
        lat: 33.5,
        long: 33.5
    }];

    res.json(branches);
};

exports.getBranchById = function (req, res) {

    Branch.findById(req.params.branch_id, function (err, branch) {
        if (!err) {
            res.json(branch);
        }
        else {
            //Utils.generateResponse(req, res, 0, err);
        }
    });
};

exports.updateBranch = function (req, res) {
    Branch.findById(req.params.branch_id, function (err, branch) {
        if (!err) {
            branch.id = req.body.number;

            car.save(function (err) {
                if (!err) {
                    res.json('branch updated');
                }
                else {
                    //Utils.generateResponse(req, res, 0, err);
                }
            });

        }
        else {
            //Utils.generateResponse(req, res, 0, err);
        }
    });
};

exports.deleteBranch = function (req, res) {
    Branch.remove({_id: req.params.branch_id}, function (err) {
        if (!err) {
            res.json('branch deleted');
        }
        else {
            //Utils.generateResponse(req, res, 0, err);
        }
    });
};

exports.createBranch = function (req, res) {
    var branch = new Branch();
    branch.id = req.body.number;
    branch.title = req.body.title;
    branch.lat = req.body.lat;
    branch.long = req.body.long;

    branch.save(function (err) {
        if (!err) {
            res.json('branch created');
        }
        else {
            //Utils.generateResponse(req, res, 0, err);
        }
    });
};



