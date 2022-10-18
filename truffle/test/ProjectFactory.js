const ProjectFactory = artifacts.require("ProjectFactory");

contract('ProjectFactory', () => {
    it('intial project count should be 0', async () => {
        const simpleStorageInstance = await ProjectFactory.deployed();
        var value = (await simpleStorageInstance.getProjectLists());
        assert.equal(value.length, 0, "factory is not reset to init");
    });

    it('Add new project', async () => {
        const accounts = await web3.eth.getAccounts();
        const simpleStorageInstance = await ProjectFactory.deployed();

        const _projectTitle = 'Title';
        const _desc = 'This is my project Desc';
        const _project_target_price = 12000;
        const _projest_deadline_date_unix = 12000;
        const _project_minimum_fund_price = 2000;

        var value = await simpleStorageInstance.createNewProject(
            _projectTitle,
            _desc,
            _project_target_price,
            _projest_deadline_date_unix,
            _project_minimum_fund_price
            , {
                from: accounts[0],
                gasLimit: 8000000
            });
        assert(value.tx, "function excuted successfully");
        assert.equal(value.receipt.from.toLowerCase(), accounts[0].toLowerCase(), "transection sent from right user");

        var projectData = await simpleStorageInstance.getProjectLists();
        assert.equal(projectData.length, 1, "New Project added to factory");
    });

    it('Verify Newly Created Project Data', async () => {
        const accounts = await web3.eth.getAccounts();
        const simpleStorageInstance = await ProjectFactory.deployed();

        const _projectTitle = 'Title';
        const _desc = 'This is my project Desc';
        const _project_target_price = 12000;
        const _projest_deadline_date_unix = 12000;
        const _project_minimum_fund_price = 22000;

        var value = await simpleStorageInstance.createNewProject(
            _projectTitle,
            _desc,
            _project_target_price,
            _projest_deadline_date_unix,
            _project_minimum_fund_price
            , {
                from: accounts[0],
                gasLimit: 8000000
            });

        var projectLists = await simpleStorageInstance.getProjectLists();
        var projectData = await simpleStorageInstance.getProjectInfoByAddress(projectLists[0].projectAddress);

        assert.equal(projectData._title, _projectTitle, "Project title is not correct");
        assert.equal(projectData._description, _desc, "Project description is not correct");
    });
});

