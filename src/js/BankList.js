import Bank from "./Bank.js";

class BankList {
    constructor(list) {
        this.list = list;
    }

    fetchBanks(url) {
        fetch(url)
            .then((res) => res.json())
            .then((json) => {
                const list = json.map((bank) => {
                    return new Bank(bank);
                });
                this.list = list;
            });
    }
}

export default new BankList();