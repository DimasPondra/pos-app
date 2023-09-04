<template>
    <ion-page id="admin-main-content">
        <LayoutAdmin title_page="Product Type">
            <ion-button size="small" fill="outline" @click="openModal"> add new </ion-button>
            <ModalProductType :is-open="isModalOpen" @ionModalDidDismiss="closeModal" />

            <FilterProductType :filter="filter" />

            <ListProductType
                :product_types="productTypeStore.data.product_types"
                @handleEdit="handleEdit"
                @handleDelete="handleDelete"
                :total="productTypeStore.data.infinite_set.total"
                @handleLoadMore="handleLoadMore"
            />
        </LayoutAdmin>
    </ion-page>
</template>

<script>
import { IonPage, IonButton, IonInput } from "@ionic/vue";
import { useProductTypeStore } from "../stores/product_types";
import { onMounted, ref, computed, reactive, watch } from "vue";

import LayoutAdmin from "../components/layout/LayoutAdmin.vue";
import ListProductType from "../components/list/ListProductType.vue";
import FilterProductType from "../components/filter/FilterProductType.vue";
import ModalProductType from "../components/modal/ModalProductType.vue";

export default {
    components: {
        LayoutAdmin,
        IonPage,
        IonButton,
        IonInput,
        ListProductType,
        ModalProductType,
        FilterProductType,
    },
    setup() {
        const productTypeStore = useProductTypeStore();
        const isModalOpen = ref(false);

        const filter = reactive({
            name: "",
        });

        const params = computed(() => {
            return {
                name: filter.name,
                page: productTypeStore.data.infinite_set.page,
                per_page: productTypeStore.data.infinite_set.per_page,
            };
        });

        watch(
            () => filter.name,
            () => {
                loadProductTypes(1);
            }
        );

        const loadProductTypes = async (value) => {
            params.value.page = value != null ? value : params.value.page;

            await productTypeStore.get(params.value);
        };

        onMounted(() => {
            loadProductTypes();
        });

        const openModal = () => {
            isModalOpen.value = true;
        };

        const closeModal = () => {
            isModalOpen.value = false;

            loadProductTypes(1);
        };

        const handleEdit = async (id) => {
            await productTypeStore.show(id);

            openModal();
        };

        const handleDelete = async (id) => {
            await productTypeStore.deleteItem(id);

            loadProductTypes(1);
        };

        const handleLoadMore = async () => {
            const loadPage = productTypeStore.data.infinite_set.page + 1;
            params.value.page = loadPage;

            await productTypeStore.get(params.value, true);
        };

        return {
            productTypeStore,
            filter,
            isModalOpen,
            openModal,
            closeModal,
            handleEdit,
            handleDelete,
            handleLoadMore,
        };
    },
};
</script>
