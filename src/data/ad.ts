/**
 * to store the ad info
 */
class Ad {

    constructor(
        public id: string
    ) {
        this.id = id;
    }

    /**
     * get ad id
     * @returns
     * @memberof Ad
     */
    getId() {
        return this.id;
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

export default Ad;
