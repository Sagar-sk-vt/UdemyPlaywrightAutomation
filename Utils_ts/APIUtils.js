class APIUtils{


    constructor(apiContext, loginPayload)
    {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken()
    {
    const loginResponce = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
    {
        data: this.loginPayload
    })
    //expect(loginResponce.ok()).toBeTruthy();
    const loginResponceJson = await loginResponce.json();
    const token = loginResponceJson.token;
    console.log(token);
    return token;
    }

    async createOrder(orderPayload)
    {
        let response ={};
        response.token= await this.getToken();
        const OrderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers:{
                            "Authorization" : response.token,
                            "Content-type" : "application/json"
                        },
            })
            const orderResponseJson = await OrderResponse.json();
            const orderId = orderResponseJson.orders[0];
            console.log(orderId); 
            console.log(orderResponseJson);
            response.orderId = orderId;
            return response;
    }
}
module.exports ={APIUtils};
