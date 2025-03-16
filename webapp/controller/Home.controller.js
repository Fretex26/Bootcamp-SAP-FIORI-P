sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
    "com/bootcamp/sapui5/freestyle/utils/HomeHelper",
	'sap/ui/model/json/JSONModel'
], (Controller, MessageBox, HomeHelper, JSONModel) => {
    "use strict";

    return Controller.extend("com.bootcamp.sapui5.freestyle.controller.Home", {
        onInit() {
        },

        showName:function () {
            const sInputValue = this.byId('productInput').getValue()
            MessageBox.alert(`Hola ${sInputValue ? sInputValue : 'mundo'}`);
            
		},

        searchProducts:async function () {
            try {
                let oDatos = await HomeHelper.getDataProducts();
                let oModel = new JSONModel(oDatos[0]);
                this.getView().setModel(oModel);
            } catch (error) {
                MessageBox.error("Error al obtener productos.");
                console.error(error);
            }
        },

        tableProducts: async function () {
            try {
                let oDatos = await HomeHelper.getDataProducts();                
                await HomeHelper.setProductModel(this, oDatos[0].results)
            } catch (error) {
                MessageBox.error("Error al obtener productos para tabla.");
                console.error(error);
            }
        }

    });
});