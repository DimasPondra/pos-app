<template>
    <ion-page id="admin-main-content">
        <LayoutAdmin title_page="Role">
            <ion-button size="small" fill="outline" @click="openModal"> add new </ion-button>
            <ModalRole :is-open="isModalOpen" @ionModalDidDismiss="closeModal" />

            <FilterRole :filter="filter" />

            <ListRole
                :roles="roleStore.data.roles"
                @handleEdit="handleEdit"
                @handleDelete="handleDelete"
                :total="roleStore.data.infinite_set.total"
                @handleLoadMore="handleLoadMore"
            />
        </LayoutAdmin>
    </ion-page>
</template>

<script>
import { IonPage, IonButton } from "@ionic/vue";
import { useRoleStore } from "../stores/roles";
import { computed, onMounted, reactive, ref, watch } from "vue";

import LayoutAdmin from "../components/layout/LayoutAdmin.vue";
import ListRole from "../components/list/ListRole.vue";
import FilterRole from "../components/filter/FilterRole.vue";
import ModalRole from "../components/modal/ModalRole.vue";

export default {
    components: { LayoutAdmin, IonPage, IonButton, ListRole, FilterRole, ModalRole },
    setup() {
        const roleStore = useRoleStore();
        const isModalOpen = ref(false);

        const filter = reactive({
            name: "",
        });

        const params = computed(() => {
            return {
                name: filter.name,
                page: roleStore.data.infinite_set.page,
                per_page: roleStore.data.infinite_set.per_page,
            };
        });

        watch(
            () => filter.name,
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

            loadRoles(1);
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

        return { roleStore, filter, isModalOpen, openModal, closeModal, handleEdit, handleDelete, handleLoadMore };
    },
};
</script>
