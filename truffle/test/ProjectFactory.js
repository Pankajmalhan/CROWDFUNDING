const ProjectFactory = artifacts.require("ProjectFactory");
var Web3 = require('web3');

contract('ProjectFactory', () => {
    it('Project is pushed to array once created', async () => {
        const projectFactory = await ProjectFactory.deployed();
        const accounts = await web3.eth.getAccounts();

        const deploy_account = accounts[0]

        var tx = await projectFactory.createNewProject("This is a title", "This is a desc", 100, 1666285902, 1, {
            from: deploy_account,
            gasLimit: 8000000
        });
        
        tx = await projectFactory.getProjectLists()

        assert.equal(tx.length, 1, "Project is pushed to array once created");
    });
    it('Project counter is incremented once created', async () => {
        const projectFactory = await ProjectFactory.deployed();

        tx = await projectFactory.getCurrentProjectID()

        assert.equal(tx.words[0], 1, "Project counter is incremented once created")
    });
    it('Title & Desc Validation', async () => {
        const projectFactory = await ProjectFactory.deployed();
        const accounts = await web3.eth.getAccounts();
        const deploy_account = accounts[0]

        var title = "This is a very long title and it should be reverted"
        var desc = "This is a very long description and it should be reverted"
        const target = 100
        const deadline = 1666285902
        const min_fund = 1

        try {
            tx = await projectFactory.createNewProject(title, desc, target, deadline, min_fund, {
            from: deploy_account,
            gasLimit: 8000000
        });
        } catch (error) {
            const PREFIX = "Returned error: VM Exception while processing transaction: revert -- Reason given: Custom error (could not decode).";
            assert(error.message.startsWith(PREFIX), "Reverts when validation logic is not met");
        }

        const _projectTitle = 'Title';
        const _desc = 'This is my project Desc';

        try {
            tx = await projectFactory.createNewProject(_projectTitle, _desc, target, deadline, min_fund, {
            from: deploy_account,
            gasLimit: 8000000
        });
        } catch (error) {
            const PREFIX = "Returned error: VM Exception while processing transaction: revert -- Reason given: Custom error (could not decode).";
        }

        tx = await projectFactory.getProjectLists()

        assert.equal(tx.length, 1, "Project is successfully created with shorter length");
    });
    it('Target & MinFund Validation', async () => {
        const projectFactory = await ProjectFactory.deployed();
        const accounts = await web3.eth.getAccounts();
        const deploy_account = accounts[0]

        var title = "Title"
        var desc = "This is my project Desc"
        const target = Web3.utils.toWei('0.1', "ether")
        const deadline = 1666285902
        const min_fund = Web3.utils.toWei('0.1', "ether")

        try {
            tx = await projectFactory.createNewProject(title, desc, target, deadline, min_fund, {
            from: deploy_account,
            gasLimit: 8000000
        });
        } catch (error) {
            const PREFIX = "Returned error: VM Exception while processing transaction:";
            assert(error.message.startsWith(PREFIX), "Reverts when validation logic is not met");
        }

        try {
            tx = await projectFactory.createNewProject(_projectTitle, _desc, Web3.utils.toWei('100', "ether"), 1666285902, Web3.utils.toWei('1', "ether"), {
            from: deploy_account,
            gasLimit: 8000000
        });
        } catch (error) {
            const PREFIX = "Returned error: VM Exception while processing transaction: revert -- Reason given: Custom error (could not decode).";
        }

        tx = await projectFactory.getProjectLists()

        assert.equal(tx.length, 1, "Project is successfully created with shorter length");
    });
});