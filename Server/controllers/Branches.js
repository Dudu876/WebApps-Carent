
var Branch = require('../models/Branch');

exports.getAllBranches = function (req, res) {
    Branch.find(function (err, branches) {
        if (!err) {
            res.json(branches);
        }
        else {
            //Utils.generateResponse(req, res, 0, err);
        }
    });
};

exports.upsertBranch = function (req, res){
    // Check if our id is 0 - then create
    if (req.body.id == '0')
    {
        var branch = new Branch();

        branch.title = req.body.title;
        branch.lat = req.body.lat;
        branch.long = req.body.long;

        branch.save(function (err) {
            if (!err) {
                res.json('added!');
            }
            else {
                //Utils.generateResponse(req, res, 0, err);
            }
        });
    }
    // else - Update
    else
    {
        Branch.findById(req.params.id, function (err, branch) {
            if (!err) {
                branch.id = req.body.id;

                branch.save(function (err) {
                    if (!err) {
                        res.json('updated!');
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
    }
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



