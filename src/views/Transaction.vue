<template>
    <ion-page id="admin-main-content">
        <LayoutAdmin title_page="Transaction">
            <ModalTransaction :is-open="isModalOpen" @ionModalDidDismiss="closeModal" />
            <ListTransaction
                :transactions="transactionStore.data.transactions"
                :total="transactionStore.data.infinite_set.total"
                @handleShow="handleShow"
                @handleLoadMore="handleLoadMore"
            />

            <RefresherComponent @handleRefresh="refresh" />
        </LayoutAdmin>
    </ion-page>
</template>

<script>
import { IonPage } from "@ionic/vue";
import { useTransactionStore } from "../stores/transactions";
import { onMounted, computed, ref } from "vue";

import LayoutAdmin from "../components/layout/LayoutAdmin.vue";
import ListTransaction from "../components/list/ListTransaction.vue";
import RefresherComponent from "../components/RefresherComponent.vue";
import ModalTransaction from "../components/modal/ModalTransaction.vue";

export default {
    components: { LayoutAdmin, IonPage, ListTransaction, RefresherComponent, ModalTransaction },
    setup() {
        const transactionStore = useTransactionStore();
        const isModalOpen = ref(false);

        const params = computed(() => {
            return {
                include: "user,details,product,file",
                page: transactionStore.data.infinite_set.page,
                per_page: transactionStore.data.infinite_set.per_page,
            };
        });

        const loadTransactions = async (value) => {
            params.value.page = value != null ? value : params.value.page;

            await transactionStore.get(params.value);
        };

        onMounted(() => {
            loadTransactions();
        });

        const closeModal = () => {
            isModalOpen.value = false;
            transactionStore.clear();
        };

        const handleShow = async (id) => {
            await transactionStore.show(id, params.value);

            isModalOpen.value = true;
        };

        const handleLoadMore = async () => {
            const loadPage = transactionStore.data.infinite_set.page + 1;
            params.value.page = loadPage;

            await transactionStore.get(params.value, true);
        };

        const refresh = (event) => {
            loadTransactions(1);
            event.target.complete();
        };

        return { transactionStore, isModalOpen, closeModal, handleShow, handleLoadMore, refresh };
    },
};
</script>
