/**
 * to store the payment order info
 */
class Order {

    constructor(
        public orderId: string,
        public token: string
    ) {
        this.orderId = orderId;
        this.token = token;
    }

    /**
     * get order
     * @returns
     * @memberof orderId
     */
    getOrder() {
        return this.orderId;
    }

    /**
     * get order token
     */
    getToken(){
        return this.token;
    }

    // /**
    //  *
    //  * @return {*}
    //  */
    // getHref() {
    //     return this.link;
    // }

    // /**
    //  *
    //  * @return {*}
    //  */
    // getBapiHref() {
    //     return this.bapiLink;
    // }
}

export default Order;
