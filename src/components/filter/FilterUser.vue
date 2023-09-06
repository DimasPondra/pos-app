<template>
    <ion-grid>
        <ion-row>
            <ion-col>
                <ion-input placeholder="Search name" v-model="filter.username"></ion-input>
            </ion-col>

            <ion-col>
                <ion-select placeholder="Select a Role" v-model="filter.role_id">
                    <ion-select-option v-for="role in roles" :key="role.id" :value="role.id">{{
                        role.name
                    }}</ion-select-option>
                </ion-select>
            </ion-col>
        </ion-row>
        <ion-row>
            <ion-col>
                <ion-button expand="block" size="small" @click="clearFilter">clear</ion-button>
            </ion-col>
        </ion-row>
    </ion-grid>
</template>

<script>
import { IonInput, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, IonButton } from "@ionic/vue";

export default {
    components: { IonInput, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, IonButton },
    props: {
        filter: {
            type: Object,
            default: {},
        },
        roles: {
            type: Array,
            default: [],
        },
    },
    emits: ["clearFilter"],
    setup(props, { emit }) {
        const clearFilter = () => {
            emit("clearFilter", null);
        };

        return { clearFilter };
    },
};
</script>
