<template>
    <ion-page id="admin-main-content">
        <LayoutAdmin title_page="Unit Type">
            <FilterUnitType :filter="unitTypeStore.data.filter" @clearFilter="clearFilter" />

            <div class="add-button">
                <ion-button size="small" color="warning" fill="outline" expand="block" @click="openModal">
                    add new
                </ion-button>
            </div>
            <ModalUnitType :is-open="isModalOpen" @ionModalDidDismiss="closeModal" />

            <ListUnitType
                :unit_types="unitTypeStore.data.unit_types"
                :total="unitTypeStore.data.infinite_set.total"
                @handleEdit="handleEdit"
                @handleDelete="handleDelete"
                @handleLoadMore="handleLoadMore"
            />

            <RefresherComponent @handleRefresh="refresh" />
        </LayoutAdmin>
    </ion-page>
</template>

<script>
import { IonPage, IonButton } from "@ionic/vue";
import { useUnitTypeStore } from "../stores/unit_types";
import { onMounted, ref, computed, watch } from "vue";

import LayoutAdmin from "../components/layout/LayoutAdmin.vue";
import ListUnitType from "../components/list/ListUnitType.vue";
import FilterUnitType from "../components/filter/FilterUnitType.vue";
import ModalUnitType from "../components/modal/ModalUnitType.vue";
import RefresherComponent from "../components/RefresherComponent.vue";

export default {
    components: {
        IonPage,
        IonButton,
        LayoutAdmin,
        ListUnitType,
        FilterUnitType,
        ModalUnitType,
        RefresherComponent,
    },
    setup() {
        const unitTypeStore = useUnitTypeStore();
        const isModalOpen = ref(false);

        const params = computed(() => {
            return {
                name: unitTypeStore.data.filter.name,
                page: unitTypeStore.data.infinite_set.page,
                per_page: unitTypeStore.data.infinite_set.per_page,
            };
        });

        watch(
            () => unitTypeStore.data.filter.name,
            () => {
                loadUnitTypes(1);
            }
        );

        const loadUnitTypes = async (value) => {
            params.value.page = value != null ? value : params.value.page;

            await unitTypeStore.get(params.value);
        };

        onMounted(() => {
            loadUnitTypes();
        });

        const openModal = () => {
            isModalOpen.value = true;
        };

        const closeModal = () => {
            isModalOpen.value = false;
            unitTypeStore.clear();
        };

        const handleEdit = async (id) => {
            await unitTypeStore.show(id);

            openModal();
        };

        const handleDelete = async (id) => {
            await unitTypeStore.deleteItem(id);

            loadUnitTypes(1);
        };

        const handleLoadMore = async () => {
            const loadPage = unitTypeStore.data.infinite_set.page + 1;
            params.value.page = loadPage;

            await unitTypeStore.get(params.value, true);
        };

        const clearFilter = () => {
            unitTypeStore.data.filter.name = "";
        };

        const refresh = (event) => {
            loadUnitTypes(1);
            event.target.complete();
        };

        return {
            unitTypeStore,
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
