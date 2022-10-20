const ProjectFactory = artifacts.require("ProjectFactory");

contract('ProjectFactory', () => {
    it('Project is pushed to array once created', async () => {
        const projectFactory = await ProjectFactory.deployed();
        const accounts = await web3.eth.getAccounts();

        const deploy_account = accounts[0]

        var tx = await projectFactory.createNewProject("This is a title", "This is a desc", 100, 21444444, 1, {
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
    it('Validation', async () => {
        const projectFactory = await ProjectFactory.deployed();
        const accounts = await web3.eth.getAccounts();
        const deploy_account = accounts[0]

        var title = "This is a very long title and it should be reverted"
        var desc = "This is a very long description and it should be reverted"
        const target = 100
        const deadline = 0
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
        const _project_target_price = 12000;
        const _projest_deadline_date_unix = 12000;
        const _project_minimum_fund_price = 2000;

        try {
            tx = await projectFactory.createNewProject(title, desc, target, deadline, min_fund, {
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

