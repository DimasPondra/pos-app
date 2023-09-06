<template>
    <ion-card>
        <ion-card-content>
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
        </ion-card-content>
    </ion-card>
</template>

<script>
import {
    IonInput,
    IonSelect,
    IonSelectOption,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonCard,
    IonCardContent,
} from "@ionic/vue";

export default {
    components: { IonInput, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, IonButton, IonCard, IonCardContent },
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
