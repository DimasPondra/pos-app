<template>
    <ion-page id="admin-main-content">
        <LayoutAdmin title_page="Role">
            <FilterRole :filter="roleStore.data.filter" @clearFilter="clearFilter" />

            <div class="add-button">
                <ion-button size="small" fill="outline" expand="block" @click="openModal"> add new </ion-button>
            </div>
            <ModalRole :is-open="isModalOpen" @ionModalDidDismiss="closeModal" />

            <ListRole
                :roles="roleStore.data.roles"
                @handleEdit="handleEdit"
                @handleDelete="handleDelete"
                :total="roleStore.data.infinite_set.total"
                @handleLoadMore="handleLoadMore"
            />

            <RefresherComponent @handleRefresh="refresh" />
        </LayoutAdmin>
    </ion-page>
</template>

<script>
import { IonPage, IonButton } from "@ionic/vue";
import { useRoleStore } from "../stores/roles";
import { computed, onMounted, ref, watch } from "vue";

import LayoutAdmin from "../components/layout/LayoutAdmin.vue";
import ListRole from "../components/list/ListRole.vue";
import FilterRole from "../components/filter/FilterRole.vue";
import ModalRole from "../components/modal/ModalRole.vue";
import RefresherComponent from "../components/RefresherComponent.vue";

export default {
    components: { LayoutAdmin, IonPage, IonButton, ListRole, FilterRole, ModalRole, RefresherComponent },
    setup() {
        const roleStore = useRoleStore();
        const isModalOpen = ref(false);

        const params = computed(() => {
            return {
                name: roleStore.data.filter.name,
                page: roleStore.data.infinite_set.page,
                per_page: roleStore.data.infinite_set.per_page,
            };
        });

        watch(
            () => roleStore.data.filter.name,
            () => {
                loadRoles(1);
            }
        );

        const loadRoles = async (value) => {
            params.value.page = value != null ? value : params.value.page;

            await roleStore.get(params.value);
        };

        onMounted(() => {
            loadRoles();
        });

        const openModal = () => {
            isModalOpen.value = true;
        };

        const closeModal = () => {
            isModalOpen.value = false;

            roleStore.clear();
        };

        const handleEdit = async (id) => {
            await roleStore.show(id);

            openModal();
        };

        const handleDelete = async (id) => {
            await roleStore.deleteItem(id);

            loadRoles(1);
        };

        const handleLoadMore = async () => {
            const loadPage = roleStore.data.infinite_set.page + 1;
            params.value.page = loadPage;
            await roleStore.get(params.value, true);
        };

        const clearFilter = () => {
            roleStore.data.filter.name = "";
        };

        const refresh = (event) => {
            loadRoles(1);
            event.target.complete();
        };

        return {
            roleStore,
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
