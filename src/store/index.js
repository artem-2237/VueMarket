import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { BASE_API_URL } from '@/config'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cartProducts: [],

        userAccessKey: null,
        cartProductsData: [],

        orderInfo: null,
    },
    mutations: {
        updateOrderInfo(state, orderInfo) {
            state.orderInfo = orderInfo
        },
        resetCart(state) {
            state.cartProducts = [];
            state.cartProductsData = [];
        },
        updateCartProductAmount(state, {productId, amount}) {
            const item = state.cartProducts.find(product => product.productId === productId)
            
            if(item) {
                item.amount = amount;
            }
        },
        deletProductFromCart(state, productId) {
            state.cartProducts = state.cartProducts.filter(product => product.productId !== productId) 
        },
        updateUserAccessKey(state, accessKey) {
            state.userAccessKey = accessKey;
        },
        updateCartProductsData(state, products) {
            state.cartProductsData = products;
        },
        syncCartProducts(state) {
            state.cartProducts = state.cartProductsData.map(item => {
                return {
                    productId: item.product.id,
                    amount: item.quantity 
                }
            })
        }
    },
    getters: {
        cartDeteilProducts(state){
            return state.cartProducts.map(item => {
                const product = state.cartProductsData.find(p => p.product.id === item.productId).product;

                return {
                    ...item,
                    product: {
                        ...product,
                        image: product.image.file.url
                    }
                }
            });
        },
        cartTotalPrice(state, getters){
            return getters.cartDeteilProducts.reduce((val, item) => (item.product.price * item.amount) + val, 0)
        },
    },
    actions: {
        loadCart(context) {
            axios
                .get(BASE_API_URL + '/api/baskets', {
                    params: {
                        userAccessKey: context.state.userAccessKey
                    }
                })
                .then(response => {
                    if(!context.state.userAccessKey){
                        localStorage.setItem('userAccessKey', response.data.user.accessKey);
                        context.commit('updateUserAccessKey', response.data.user.accessKey);
                    }
                    
                    context.commit('updateCartProductsData', response.data.items)
                    context.commit('syncCartProducts')
                    
                })
        },
        addProductToCart(context, {productId, amount}) {
            return axios.post(BASE_API_URL + '/api/baskets/products', 
                {
                    productId: productId,
                    quantity: amount
                }, 
                {  
                    params: {
                        userAccessKey: context.state.userAccessKey
                    }
                })
                .then(response => {
                    context.commit('updateCartProductsData', response.data.items)
                    context.commit('syncCartProducts')
                })
        },
        updateCartProductAmount(context, {productId, amount}) {
            context.commit('updateCartProductAmount', {productId, amount})

            if(amount < 1) return;

            return axios.put(BASE_API_URL + '/api/baskets/products', 
                {
                    productId: productId,
                    quantity: amount
                }, 
                {  
                    params: {
                        userAccessKey: context.state.userAccessKey
                    }
                })
            .then(response => context.commit('updateCartProductsData', response.data.items))
            .catch(() => context.commit('syncCartProducts'))
        },
        deleteProductFromCart(context, productId) {
            context.commit('deletProductFromCart', productId)

            return axios.delete(BASE_API_URL + '/api/baskets/products', 
                {
                    data: {
                        productId: productId,
                    },
                    params: {
                        userAccessKey: context.state.userAccessKey
                    }
                })
                .then(response => context.commit('updateCartProductsData', response.data.items))
        },
        loadOrderInfo(context, orderId) {
            return axios
            .get(BASE_API_URL + '/api/orders/' + orderId, {
                params: {
                    userAccessKey: context.state.userAccessKey
                }
            })
            .then(response => {
                context.commit('updateOrderInfo', response.data)
            });
        }
    }
});
