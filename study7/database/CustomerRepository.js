class CustomerRepository {
    constructor(connectionPool) {
        this.connectionPool = connectionPool;
    }

    get pool() {
        return this.connectionPool.getPool();
    }

    save(customer, callback) {
        this.pool.query("insert into customers set ?", customer, callback);
    }

    get(id, callback) {
        this.pool.query("select * from customers where id = ?", id, callback);
    }

    getAll(callback) {
        this.pool.query("select * from customers", callback);
    }

    update(id, customer, callback) {
        this.pool.query(
            "update customers set ? where id = ?",
            [customer, id],
            callback
        );
    }

    delete(id, callback) {
        this.pool.query("delete from customers where id = ?", id, callback);
    }
}

module.exports = CustomerRepository;