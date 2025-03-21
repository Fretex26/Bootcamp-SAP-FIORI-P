sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "com/bootcamp/sapui5/freestyle/utils/HomeHelper",
    'sap/ui/model/json/JSONModel',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
], (Controller, MessageBox, HomeHelper, JSONModel, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("com.bootcamp.sapui5.freestyle.controller.Home", {
        onInit() {
            this.oRouter = this.getOwnerComponent().getRouter()
            this.aMultiInput = []
        },

        showName: function () {
            const sInputValue = this.byId('productInput').getValue()
            MessageBox.alert(`Hola ${sInputValue ? sInputValue : 'mundo'}`);

        },

        searchProducts: async function () {
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
        },

        onItemPress: function (oEvent) {            
            let oSource = oEvent.getSource();
            let oDatos = oSource.getBindingContext().getObject();
            this.oRouter.navTo("detail", { ProductID: oDatos.ProductID });
        },

        onChange: async function (oEvent) {
            
            // let oFilter = []
            // let oSource = oEvent.getSource()
            // let oTable = this.getView().byId("idProductsTable")
            // let oBinding = oTable.getBinding("items")
            
            // if(oSource.getValue()){
            //     oFilter = new Filter("ProductID", FilterOperator.EQ, oSource.getValue())
            // }

            // oBinding.filter(oFilter)
        },

        onFilter: async function () {
            
            let oFilter = []
            // let sValue = this.byId("inputId").getValue()
            // let sValueCombo = this.byId("comboboxID").getSelectedKey()
            let values = this.getOwnerComponent().getModel("LocalDataModel").getData()

            let oTable = this.getView().byId("idProductsTable")
            let oBinding = oTable.getBinding("items")

            if(values?.valueInput){
                // oFilter.push(new Filter("ProductID", FilterOperator.EQ, sValue))
                oFilter.push(new Filter("ProductID", FilterOperator.EQ, values.valueInput))
            }

            if(values?.selectedKey){
                // oFilter.push(new Filter("CategoryID", FilterOperator.EQ, sValueCombo))
                oFilter.push(new Filter("CategoryID", FilterOperator.EQ, values.selectedKey))
            }

            if(this.aMultiInput.length){
                this.aMultiInput.forEach(element => {
                    oFilter.push(new Filter("CategoryID", FilterOperator.EQ, element))
                });
            }

            if(values?.selectedKeyMulti.length){
                values.selectedKeyMulti.forEach(element => {
                    oFilter.push(new Filter("SupplierID", FilterOperator.EQ, element))
                });
            }

            //let oDatos = await HomeHelper.getDataProducts([oFilter]);
            //await HomeHelper.setProductModel(this, oDatos[0].results)

            oBinding.filter(oFilter)
        },

        onSelectionChange: async function (oEvent) {
            // let oFilter = []
            // let oSource = oEvent.getSource()
            // let oTable = this.getView().byId("idProductsTable")
            // let oBinding = oTable.getBinding("items")
            
            // if(oSource.getSelectedKey()){
            //     oFilter = new Filter("CategoryID", FilterOperator.EQ, oSource.getSelectedKey())
            // }

            // oBinding.filter(oFilter)
        },

        onMultiInputChange: function (oControlEvent) {
            let oSource = oControlEvent.getParameters().addedTokens
            let oRemovedSource = oControlEvent.getParameters().removedTokens

            if (oSource.length) {
                oSource.map((token)=>{
                    this.aMultiInput.push(token.getKey())
                })
            }

            if (oRemovedSource.length) {
                oRemovedSource.map((token)=>{
                    const elementIndex = this.aMultiInput.indexOf(token.getKey());
                    this.aMultiInput.splice(elementIndex, 1)
                })
            }
        }
    });
});