<template>
    <ion-page id="admin-main-content">
        <LayoutAdmin title_page="Cart">
            <FilterProduct
                :filter="productStore.data.filter"
                :product_types="productTypeStore.data.product_types"
                @clearFilter="clearFilter"
            />
            <ListProduct
                :products="productStore.data.products"
                :total="productStore.data.infinite_set.total"
                :add_cart="true"
                @handleLoadMore="handleLoadMore"
                @handleAddToCart="handleAddToCart"
            />

            <ModalCart :is-open="isModalOpen" @ionModalDidDismiss="closeModal" />

            <ListCart :carts="cartStore.data.carts" @handleEdit="handleEdit" @handleDelete="handleDelete" />
            <div class="add-button margin-bottom-10" v-if="cartStore.data.carts.length >= 1">
                <ion-button size="small" color="success" expand="block" @click="handleCheckout">checkout</ion-button>
            </div>

            <RefresherComponent @handleRefresh="refresh" />
        </LayoutAdmin>
    </ion-page>
</template>

<script>
import { IonPage, IonButton, loadingController } from "@ionic/vue";
import { useCartStore } from "../stores/carts";
import { useProductStore } from "../stores/products";
import { useProductTypeStore } from "../stores/product_types";
import { useTransactionStore } from "../stores/transactions";
import { computed, onMounted, ref, watch } from "vue";

import LayoutAdmin from "../components/layout/LayoutAdmin.vue";
import FilterProduct from "../components/filter/FilterProduct.vue";
import ListProduct from "../components/list/ListProduct.vue";
import ModalCart from "../components/modal/ModalCart.vue";
import ListCart from "../components/list/ListCart.vue";
import RefresherComponent from "../components/RefresherComponent.vue";

export default {
    components: {
        IonPage,
        IonButton,
        LayoutAdmin,
        FilterProduct,
        ListProduct,
        ModalCart,
        ListCart,
        RefresherComponent,
    },
    setup() {
        const cartStore = useCartStore();
        const productStore = useProductStore();
        const productTypeStore = useProductTypeStore();
        const transactionStore = useTransactionStore();
        const isModalOpen = ref(false);

        const params = computed(() => {
            return {
                include: "product",
            };
        });

        const productParams = computed(() => {
            return {
                include: "product_type,file",
                name: productStore.data.filter.name,
                product_type_id: productStore.data.filter.product_type_id,
                page: productStore.data.infinite_set.page,
                per_page: productStore.data.infinite_set.per_page,
            };
        });

        watch(
            () => productStore.data.filter,
            async () => {
                await productStore.get(productParams.value);
            },
            { deep: true }
        );

        const loadCarts = async () => {
            await cartStore.get(params.value);
        };

        onMounted(async () => {
            try {
                await cartStore.get(params.value);
                await productStore.get(productParams.value);
                await productTypeStore.get();
            } catch (error) {
                console.log(error);
            } finally {
                await loadingController.dismiss();
            }
        });

        const closeModal = () => {
            isModalOpen.value = false;
            cartStore.clear();
            productStore.clear();
        };

        const handleAddToCart = async (id) => {
            await productStore.show(id, productParams.value);
            cartStore.data.cart.product_id = id;

            isModalOpen.value = true;
        };

        const handleEdit = async (id) => {
            await cartStore.show(id, params.value);
            await productStore.show(cartStore.data.cart.product_id, productParams.value);

            isModalOpen.value = true;
        };

        const handleDelete = async (id) => {
            await cartStore.deleteItem(id);

            loadCarts();
        };

        const handleLoadMore = async () => {
            const loadPage = productStore.data.infinite_set.page + 1;
            productParams.value.page = loadPage;

            await productStore.get(productParams.value, true);
        };

        const clearFilter = () => {
            productStore.data.filter.name = "";
            productStore.data.filter.product_type_id = null;
        };

        const refresh = async (event) => {
            productParams.value.page = 1;

            try {
                await cartStore.get(params.value);
                await productStore.get(productParams.value);
                await productTypeStore.get();
            } catch (error) {
                console.log(error);
            } finally {
                event.target.complete();
            }
        };

        const handleCheckout = async () => {
            await transactionStore.save();
            loadCarts();
        };

        return {
            cartStore,
            productStore,
            productTypeStore,
            isModalOpen,
            closeModal,
            handleAddToCart,
            handleEdit,
            handleDelete,
            handleLoadMore,
            clearFilter,
            refresh,
            handleCheckout,
        };
    },
};
</script>
