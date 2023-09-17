<template>
    <ion-page id="admin-main-content">
        <LayoutAdmin title_page="Product">
            <FilterPayrollSetting
                :filter="payrollSettingStore.data.filter"
                :unit_types="unitTypeStore.data.unit_types"
                @clearFilter="clearFilter"
            />

            <div class="add-button">
                <ion-button size="small" color="warning" fill="outline" expand="block" @click="openModal"
                    >add new</ion-button
                >
            </div>
            <ModalPayrollSetting
                :is-open="isModalOpen"
                @ionModalDidDismiss="closeModal"
                :unit_types="unitTypeStore.data.unit_types"
            />

            <ListPayrollSetting
                :payroll_settings="payrollSettingStore.data.payroll_settings"
                :total="payrollSettingStore.data.infinite_set.total"
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
import { usePayrollSettingStore } from "../stores/payroll_settings";
import { computed, onMounted, ref, watch } from "vue";
import { useUnitTypeStore } from "../stores/unit_types";

import LayoutAdmin from "../components/layout/LayoutAdmin.vue";
import ListPayrollSetting from "../components/list/ListPayrollSetting.vue";
import FilterPayrollSetting from "../components/filter/FilterPayrollSetting.vue";
import ModalPayrollSetting from "../components/modal/ModalPayrollSetting.vue";
import RefresherComponent from "../components/RefresherComponent.vue";

export default {
    components: {
        IonPage,
        IonButton,
        LayoutAdmin,
        FilterPayrollSetting,
        ListPayrollSetting,
        ModalPayrollSetting,
        RefresherComponent,
    },
    setup() {
        const payrollSettingStore = usePayrollSettingStore();
        const unitTypeStore = useUnitTypeStore();
        const isModalOpen = ref(false);

        const params = computed(() => {
            return {
                include: "unit_type",
                name: payrollSettingStore.data.filter.name,
                unit_type_id: payrollSettingStore.data.filter.unit_type_id,
                page: payrollSettingStore.data.infinite_set.page,
                per_page: payrollSettingStore.data.infinite_set.per_page,
            };
        });

        watch(
            () => payrollSettingStore.data.filter,
            () => {
                loadPayrollSettings(1);
            },
            { deep: true }
        );

        const loadPayrollSettings = async (value) => {
            params.value.page = value != null ? value : params.value.page;

            await payrollSettingStore.get(params.value);
        };

        onMounted(async () => {
            try {
                await payrollSettingStore.get(params.value);
                await unitTypeStore.get();
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
            payrollSettingStore.clear();
        };

        const handleEdit = async (id) => {
            await payrollSettingStore.show(id, params.value);

            openModal();
        };

        const handleDelete = async (id) => {
            await payrollSettingStore.deleteItem(id);

            loadPayrollSettings(1);
        };

        const handleLoadMore = async () => {
            const loadPage = payrollSettingStore.data.infinite_set.page + 1;
            params.value.page = loadPage;

            await payrollSettingStore.get(params.value, true);
        };

        const clearFilter = () => {
            payrollSettingStore.data.filter.name = "";
            payrollSettingStore.data.filter.unit_type_id = null;
        };

        const refresh = async (event) => {
            params.value.page = 1;

            try {
                await payrollSettingStore.get(params.value);
                await unitTypeStore.get();
            } catch (error) {
                console.log(error);
            } finally {
                event.target.complete();
            }
        };

        return {
            payrollSettingStore,
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
