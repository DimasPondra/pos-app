<template>
    <ion-page id="admin-main-content">
        <LayoutAdmin title_page="User">
            <FilterUser :filter="userStore.data.filter" :roles="roleStore.data.roles" @clearFilter="clearFilter" />

            <div class="add-button">
                <ion-button size="small" fill="outline" expand="block" @click="openModal">add new</ion-button>
            </div>
            <ModalUser :is-open="isModalOpen" @ionModalDidDismiss="closeModal" :roles="roleStore.data.roles" />

            <ListUser
                :users="userStore.data.users"
                @handleEdit="handleEdit"
                :total="userStore.data.infinite_set.total"
                @handleLoadMore="handleLoadMore"
            />
        </LayoutAdmin>
    </ion-page>
</template>

<script>
import { IonPage, IonButton, loadingController } from "@ionic/vue";
import { useUserStore } from "../stores/users";
import { computed, onMounted, ref, watch } from "vue";
import { useRoleStore } from "../stores/roles";

import LayoutAdmin from "../components/layout/LayoutAdmin.vue";
import ListUser from "../components/list/ListUser.vue";
import FilterUser from "../components/filter/FilterUser.vue";
import ModalUser from "../components/modal/ModalUser.vue";

export default {
    components: { LayoutAdmin, IonPage, IonButton, ListUser, FilterUser, ModalUser },
    setup() {
        const userStore = useUserStore();
        const roleStore = useRoleStore();
        const isModalOpen = ref(false);

        const params = computed(() => {
            return {
                include: "role,file",
                username: userStore.data.filter.username,
                role_id: userStore.data.filter.role_id,
                page: userStore.data.infinite_set.page,
                per_page: userStore.data.infinite_set.per_page,
            };
        });

        watch(
            () => userStore.data.filter,
            () => {
                loadUsers(1);
            },
            { deep: true }
        );

        const loadUsers = async (value) => {
            params.value.page = value != null ? value : params.value.page;

            await userStore.get(params.value);
        };

        onMounted(async () => {
            try {
                await userStore.get(params.value);
                await roleStore.get();
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
            userStore.clear();
        };

        const handleEdit = async (id) => {
            await userStore.show(id, params.value);

            openModal();
        };

        const handleLoadMore = async () => {
            const loadPage = userStore.data.infinite_set.page + 1;
            params.value.page = loadPage;
            await userStore.get(params.value, true);
        };

        const clearFilter = () => {
            userStore.data.filter.username = "";
            userStore.data.filter.role_id = null;
        };

        return {
            userStore,
            roleStore,
            isModalOpen,
            openModal,
            closeModal,
            handleEdit,
            handleLoadMore,
            clearFilter,
        };
    },
};
</script>
