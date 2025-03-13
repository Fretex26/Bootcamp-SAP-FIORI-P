sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], (Controller, MessageBox) => {
    "use strict";

    return Controller.extend("com.bootcamp.sapui5.freestyle.controller.Home", {
        onInit() {
        },

        onPress:function () {
            const sInputValue = this.byId('productInput').getValue()
            MessageBox.alert(`Hola ${sInputValue ? sInputValue : 'mundo'}`);
		}
    });
});