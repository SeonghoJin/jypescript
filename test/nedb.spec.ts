import { expect } from 'chai'
import { describe } from 'mocha'
import { isIDatabase, NeDB, IDatabase, Connect, IDatabaseConfig, } from '../dist'

const databaseConfig: IDatabaseConfig = {
    name: "nedbtest"
};

class Test {

    @Connect(databaseConfig)
    database: IDatabase;
    constructor() {

        describe("test nedb", () => {

            it("insert 성공", async () => {
                await this.database.insert({
                    testId: "test",
                    testPassword: "password"
                });
                const item = await this.database.find({
                    testId: "test"
                });

                expect(item.length).to.not.equal(0);
            });

            it("getAllData 성공", async () => {
                const items = await this.database.getAllData();
                expect(items.length).to.not.equal(0);
            })

            it("update 성공", async () => {
                await this.database.insert({
                    test: "1"
                });

                await this.database.update({
                    test: "1"
                },
                    {
                        test: "2"
                    }
                );

                const items = await this.database.find({
                    test: "2"
                });

                expect(items.length).to.not.equal(0);
            })

            it("delete 성공", async () => {
                await this.database.insert({
                    "1": "1"
                });
                await this.database.remove({
                    "1": "1"
                });
                const items = await this.database.find({
                    "1": "1"
                })
                expect(items.length).equal(0);
            })
        });

    }

}

new Test();