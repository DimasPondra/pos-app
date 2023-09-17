<template>
    <ion-page id="admin-main-content">
        <LayoutAdmin title_page="Salary">
            <div class="add-button">
                <ion-button size="small" color="warning" fill="outline" expand="block" @click="openModal"
                    >add new</ion-button
                >
            </div>
            <ModalSalary :is-open="isModalOpen" @ionModalDidDismiss="closeModal" :roles="roleStore.data.roles" />

            <ListSalary
                :salaries="salaryStore.data.salaries"
                :total="salaryStore.data.infinite_set.total"
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
import { useRoleStore } from "../stores/roles";
import { useSalaryStore } from "../stores/salaries";
import { computed, onMounted, ref } from "vue";

import LayoutAdmin from "../components/layout/LayoutAdmin.vue";
import ListSalary from "../components/list/ListSalary.vue";
import ModalSalary from "../components/modal/ModalSalary.vue";
import RefresherComponent from "../components/RefresherComponent.vue";

export default {
    components: { IonPage, IonButton, LayoutAdmin, ListSalary, ModalSalary, RefresherComponent },
    setup() {
        const salaryStore = useSalaryStore();
        const roleStore = useRoleStore();
        const isModalOpen = ref(false);

        const params = computed(() => {
            return {
                include: "role",
                page: salaryStore.data.infinite_set.page,
                per_page: salaryStore.data.infinite_set.per_page,
            };
        });

        const loadSalaries = async (value) => {
            params.value.page = value != null ? value : params.value.page;

            await salaryStore.get(params.value);
        };

        onMounted(async () => {
            try {
                await salaryStore.get(params.value);
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
            salaryStore.clear();
        };

        const handleEdit = async (id) => {
            await salaryStore.show(id, params.value);

            openModal();
        };

        const handleDelete = async (id) => {
            await salaryStore.deleteItem(id);

            loadSalaries(1);
        };

        const handleLoadMore = async () => {
            const loadPage = salaryStore.data.infinite_set.page + 1;
            params.value.page = loadPage;

            await salaryStore.get(params.value, true);
        };

        const refresh = async (event) => {
            params.value.page = 1;

            try {
                await salaryStore.get(params.value);
                await roleStore.get();
            } catch (error) {
                console.log(error);
            } finally {
                event.target.complete();
            }
        };

        return {
            salaryStore,
            roleStore,
            isModalOpen,
            openModal,
            closeModal,
            handleEdit,
            handleDelete,
            handleLoadMore,
            refresh,
        };
    },
};
</script>
