sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
    "com/bootcamp/sapui5/freestyle/utils/HomeHelper"
], (Controller, MessageBox, HomeHelper) => {
    "use strict";

    return Controller.extend("com.bootcamp.sapui5.freestyle.controller.Home", {
        onInit() {
        },

        showName:function () {
            const sInputValue = this.byId('productInput').getValue()
            MessageBox.alert(`Hola ${sInputValue ? sInputValue : 'mundo'}`);
		},

        onPress:async function () {
            let oDatos = await HomeHelper.getDataProducts()
        }
    });
});