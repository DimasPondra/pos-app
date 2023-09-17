<template>
    <ion-page id="admin-main-content">
        <LayoutAdmin title_page="Payroll">
            <FilterPayroll :filter="payrollStore.data.filter" @clearFilter="clearFilter" />

            <div class="add-button">
                <ion-button size="small" color="warning" fill="outline" expand="block" @click="openModal"
                    >add new</ion-button
                >
            </div>
            <ModalPayroll :is-open="isModalOpen" @ionModalDidDismiss="closeModal" :users="userStore.data.users" />

            <ListPayroll
                :payrolls="payrollStore.data.payrolls"
                :total="payrollStore.data.infinite_set.total"
                @handleEdit="handleEdit"
                @handleLoadMore="handleLoadMore"
            />

            <RefresherComponent @handleRefresh="refresh" />
        </LayoutAdmin>
    </ion-page>
</template>

<script>
import { IonPage, IonButton, loadingController } from "@ionic/vue";
import { usePayrollStore } from "../stores/payrolls";
import { useUserStore } from "../stores/users";
import { computed, onMounted, ref, watch } from "vue";

import LayoutAdmin from "../components/layout/LayoutAdmin.vue";
import ListPayroll from "../components/list/ListPayroll.vue";
import FilterPayroll from "../components/filter/FilterPayroll.vue";
import ModalPayroll from "../components/modal/ModalPayroll.vue";
import RefresherComponent from "../components/RefresherComponent.vue";

export default {
    components: { IonPage, IonButton, LayoutAdmin, ListPayroll, FilterPayroll, ModalPayroll, RefresherComponent },
    setup() {
        const payrollStore = usePayrollStore();
        const userStore = useUserStore();
        const isModalOpen = ref(false);

        const params = computed(() => {
            return {
                include: "user",
                name: payrollStore.data.filter.name,
                status: payrollStore.data.filter.status,
                month: payrollStore.data.filter.month,
                year: payrollStore.data.filter.year,
                page: payrollStore.data.infinite_set.page,
                per_page: payrollStore.data.infinite_set.per_page,
            };
        });

        watch(
            () => payrollStore.data.filter,
            () => {
                loadPayrolls(1);
            },
            { deep: true }
        );

        const loadPayrolls = async (value) => {
            params.value.page = value != null ? value : params.value.page;

            await payrollStore.get(params.value);
        };

        onMounted(async () => {
            try {
                await payrollStore.get(params.value);
                await userStore.get();
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
            payrollStore.clear();
        };

        const handleEdit = async (id) => {
            await payrollStore.show(id, params.value);

            openModal();
        };

        const handleLoadMore = async () => {
            const loadPage = payrollStore.data.infinite_set.page + 1;
            params.value.page = loadPage;

            await payrollStore.get(params.value, true);
        };

        const clearFilter = () => {
            payrollStore.data.filter.name = "";
            payrollStore.data.filter.status = "";
            payrollStore.data.filter.month = "";
            payrollStore.data.filter.year = "";
        };

        const refresh = async (event) => {
            params.value.page = 1;

            try {
                await payrollStore.get(params.value);
                await userStore.get();
            } catch (error) {
                console.log(error);
            } finally {
                event.target.complete();
            }
        };

        return {
            payrollStore,
            userStore,
            isModalOpen,
            openModal,
            closeModal,
            handleEdit,
            handleLoadMore,
            clearFilter,
            refresh,
        };
    },
};
</script>
