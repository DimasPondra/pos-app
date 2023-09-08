<template>
    <ion-page id="admin-main-content">
        <LayoutAdmin title_page="Product">
            <FilterProduct
                :filter="filter"
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
        </LayoutAdmin>
    </ion-page>
</template>

<script>
import { IonPage, IonButton } from "@ionic/vue";
import { useProductStore } from "../stores/products";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useProductTypeStore } from "../stores/product_types";

import LayoutAdmin from "../components/layout/LayoutAdmin.vue";
import ListProduct from "../components/list/ListProduct.vue";
import FilterProduct from "../components/filter/FilterProduct.vue";
import ModalProduct from "../components/modal/ModalProduct.vue";

export default {
    components: { IonPage, IonButton, LayoutAdmin, FilterProduct, ListProduct, ModalProduct },
    setup() {
        const productStore = useProductStore();
        const productTypeStore = useProductTypeStore();
        const isModalOpen = ref(false);

        const filter = reactive({
            name: "",
            product_type_id: null,
        });

        const params = computed(() => {
            return {
                include: "product_type,file",
                name: filter.name,
                product_type_id: filter.product_type_id,
                page: productStore.data.infinite_set.page,
                per_page: productStore.data.infinite_set.per_page,
            };
        });

        watch(
            () => filter,
            () => {
                loadProducts(1);
            },
            { deep: true }
        );

        const loadProducts = async (value) => {
            params.value.page = value != null ? value : params.value.page;

            await productStore.get(params.value);
        };

        const loadProductTypes = async () => {
            await productTypeStore.get();
        };

        onMounted(() => {
            loadProducts();
            loadProductTypes();
        });

        const openModal = () => {
            isModalOpen.value = true;
        };

        const closeModal = () => {
            isModalOpen.value = false;

            loadProducts(1);
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
            filter.name = "";
            filter.product_type_id = null;
        };

        return {
            productStore,
            productTypeStore,
            filter,
            isModalOpen,
            openModal,
            closeModal,
            handleEdit,
            handleDelete,
            handleLoadMore,
            clearFilter,
        };
    },
};
</script>
