import {AppConstants} from "../../app-constants/app-config";

const formatter = new Intl.NumberFormat(AppConstants.formatterConfig.locale, {
    style: AppConstants.formatterConfig.style,
    currency: AppConstants.formatterConfig.currency,
   });

export const Utility = {
    formatNumber : formatter
}