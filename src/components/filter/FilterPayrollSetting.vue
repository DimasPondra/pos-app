<template>
    <ion-card>
        <ion-card-content>
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <ion-input placeholder="Search name" v-model="filter.name"></ion-input>
                    </ion-col>

                    <ion-col>
                        <ion-select placeholder="Select a Type" v-model="filter.unit_type_id">
                            <ion-select-option
                                v-for="unit_type in unit_types"
                                :key="unit_type.id"
                                :value="unit_type.id"
                                >{{ unit_type.name }}</ion-select-option
                            >
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
        unit_types: {
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
