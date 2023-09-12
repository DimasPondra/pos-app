<template>
    <ion-page id="admin-main-content">
        <LayoutAdmin title_page="Product">
            <FilterProduct
                :filter="productStore.data.filter"
                :product_types="productTypeStore.data.product_types"
                @clearFilter="clearFilter"
            />

            <div class="add-button">
                <ion-button size="small" fill="outline" expand="block" @click="openModal">add new</ion-button>
            </div>
            <ModalProduct
                :is-open="isModalOpen"
                @ionModalDidDismiss="closeModal"
                :product_types="productTypeStore.data.product_types"
            />

            <ListProduct
                :products="productStore.data.products"
                :total="productStore.data.infinite_set.total"
                @handleEdit="handleEdit"
                @handleDelete="handleDelete"
                @handleLoadMore="handleLoadMore"
            />

            <RefresherComponent @handleRefresh="refresh" />
        </LayoutAdmin>
    </ion-page>
</template>

<script>
import { IonPage, IonButton, loadingController } from "@ionic/vue";
import { useProductStore } from "../stores/products";
import { computed, onMounted, ref, watch } from "vue";
import { useProductTypeStore } from "../stores/product_types";

import LayoutAdmin from "../components/layout/LayoutAdmin.vue";
import ListProduct from "../components/list/ListProduct.vue";
import FilterProduct from "../components/filter/FilterProduct.vue";
import ModalProduct from "../components/modal/ModalProduct.vue";
import RefresherComponent from "../components/RefresherComponent.vue";

export default {
    components: { IonPage, IonButton, LayoutAdmin, FilterProduct, ListProduct, ModalProduct, RefresherComponent },
    setup() {
        const productStore = useProductStore();
        const productTypeStore = useProductTypeStore();
        const isModalOpen = ref(false);

        const params = computed(() => {
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
            () => {
                loadProducts(1);
            },
            { deep: true }
        );

        const loadProducts = async (value) => {
            params.value.page = value != null ? value : params.value.page;

            await productStore.get(params.value);
        };

        onMounted(async () => {
            try {
                await productStore.get(params.value);
                await productTypeStore.get();
            } catch (error) {
                console.log(error);
            } finally {
                await loadingController.dismiss();
            }
        });

        const openModal = () => {
            isModalOpen.value = true;
        };

        const closeModal = () => {
            isModalOpen.value = false;
            productStore.clear();
        };

        const handleEdit = async (id) => {
            await productStore.show(id, params.value);

            openModal();
        };

        const handleDelete = async (id) => {
            await productStore.deleteItem(id);

            loadProducts(1);
        };

        const handleLoadMore = async () => {
            const loadPage = productStore.data.infinite_set.page + 1;
            params.value.page = loadPage;

            await productStore.get(params.value, true);
        };

        const clearFilter = () => {
            productStore.data.filter.name = "";
            productStore.data.filter.product_type_id = null;
        };

        const refresh = async (event) => {
            params.value.page = 1;

            try {
                await productStore.get(params.value);
                await productTypeStore.get();
            } catch (error) {
                console.log(error);
            } finally {
                event.target.complete();
            }
        };

        return {
            productStore,
            productTypeStore,
            isModalOpen,
            openModal,
            closeModal,
            handleEdit,
            handleDelete,
            handleLoadMore,
            clearFilter,
            refresh,
        };
    },
};
</script>
