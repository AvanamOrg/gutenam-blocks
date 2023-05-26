(()=>{"use strict";var e={n:t=>{var n=t&&t.__esModule?()=>t.default:()=>t;return e.d(n,{a:n}),n},d:(t,n)=>{for(var i in n)e.o(n,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:n[i]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{BaseColorOutput:()=>l,ConvertColor:()=>k,DeprecatedBaseColorOutput:()=>S,FONT_SIZES_MAP:()=>T,GAP_SIZES_MAP:()=>j,SPACING_SIZES_MAP:()=>I,SafeParseJSON:()=>M,advancedGetPreviewSize:()=>_,capitalizeFirstLetter:()=>O,clearNonMatchingValues:()=>Q,fetchJson:()=>w,getBorderColor:()=>p,getBorderStyle:()=>b,getFontSizeOptionOutput:()=>C,getGapSizeOptionOutput:()=>R,getInQueryBlock:()=>G,getPreviewSize:()=>i,getSpacingNameFromSize:()=>V,getSpacingOptionName:()=>E,getSpacingOptionOutput:()=>U,getSpacingOptionSize:()=>J,getSpacingValueFromSize:()=>W,getTransferableAttributes:()=>F,getUniqueId:()=>B,getUnitIcon:()=>N,hexToRGBA:()=>o,isRTL:()=>P,linkedOrIndividual:()=>H,mouseOverVisualizer:()=>q,objectSameFill:()=>Z,setBlockDefaults:()=>A,showSettings:()=>h,typographyStyle:()=>D});const n=window.wp.element,i=(e,t,i,o)=>(0,n.useMemo)((()=>{if("Mobile"===e){if(void 0!==o&&""!==o&&null!==o)return o;if(void 0!==i&&""!==i&&null!==i)return i}else if("Tablet"===e&&void 0!==i&&""!==i&&null!==i)return i;return void 0!==t?t:""}),[e,t,i,o]),o=(e,t)=>null===e?"":(e.indexOf("var(")>-1&&(e=window.getComputedStyle(document.documentElement).getPropertyValue(e.replace("var(","").replace(")",""))||"#fff"),e=e.replace("#",""),"rgba("+parseInt(3===e.length?e.slice(0,1).repeat(2):e.slice(0,2),16)+", "+parseInt(3===e.length?e.slice(1,2).repeat(2):e.slice(2,4),16)+", "+parseInt(3===e.length?e.slice(2,3).repeat(2):e.slice(4,6),16)+", "+t+")");function l(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return e&&e.startsWith("palette")?e="var(--global-"+e+")":null===t||isNaN(t)||1===Number(t)||void 0===e||""===e||(e=o(e,t)),e}function r(e,t,n){return a(e,t,void 0!==n?.[0]?n?.[0]:[],void 0!==n?.[1]?n?.[1]:[],void 0!==n?.[2]?n?.[2]:[])}function a(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"top",n=arguments.length>2?arguments[2]:void 0,i=arguments.length>3?arguments[3]:void 0,o=arguments.length>4?arguments[4]:void 0,a=arguments.length>5&&void 0!==arguments[5]&&arguments[5];if("Mobile"===e){if(void 0!==o?.[0]?.[t]?.[0]&&""!==o?.[0]?.[t]?.[0])return l(o?.[0]?.[t]?.[0]);if(""!==i?.[0]?.[t]?.[0])return l(i?.[0]?.[t]?.[0]);if(a&&r(e,t,a))return r(e,t,a)}else if("Tablet"===e){if(void 0!==i?.[0]?.[t]?.[0]&&""!==i?.[0]?.[t]?.[0])return l(i?.[0]?.[t]?.[0]);if(a&&r(e,t,a))return r(e,t,a)}return void 0!==n?.[0]?.[t]?.[0]&&""!==n?.[0]?.[t]?.[0]?l(n?.[0]?.[t]?.[0]):a&&r(e,t,a)?r(e,t,a):""}function u(e,t,n){return s(e,t,void 0!==n?.[0]?n?.[0]:[],void 0!==n?.[1]?n?.[1]:[],void 0!==n?.[2]?n?.[2]:[])}function s(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"top",n=arguments.length>2?arguments[2]:void 0,i=arguments.length>3?arguments[3]:void 0,o=arguments.length>4?arguments[4]:void 0,l=arguments.length>5&&void 0!==arguments[5]&&arguments[5];if("Mobile"===e){if(void 0!==o?.[0]?.[t]?.[1]&&""!==o?.[0]?.[t]?.[1])return o?.[0]?.[t]?.[1];if(""!==i?.[0]?.[t]?.[1])return i?.[0]?.[t]?.[1];if(l&&u(e,t,l))return u(e,t,l)}else if("Tablet"===e){if(void 0!==i?.[0]?.[t]?.[1]&&""!==i?.[0]?.[t]?.[1])return i?.[0]?.[t]?.[1];if(l&&u(e,t,l))return u(e,t,l)}return void 0!==n?.[0]?.[t]?.[1]&&""!==n?.[0]?.[t]?.[1]?n?.[0]?.[t]?.[1]:l&&u(e,t,l)?u(e,t,l):""}function g(e,t,n){return d(e,t,void 0!==n?.[0]?n?.[0]:[],void 0!==n?.[1]?n?.[1]:[],void 0!==n?.[2]?n?.[2]:[])}function d(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"top",n=arguments.length>2?arguments[2]:void 0,i=arguments.length>3?arguments[3]:void 0,o=arguments.length>4?arguments[4]:void 0,l=arguments.length>5&&void 0!==arguments[5]&&arguments[5];if("Mobile"===e){if(void 0!==o?.[0]?.[t]?.[2]&&""!==o?.[0]?.[t]?.[2])return o?.[0]?.[t]?.[2]+v(e,n,i,o,l);if(""!==i?.[0]?.[t]?.[2])return i?.[0]?.[t]?.[2]+v(e,n,i,o,l);if(l&&g(e,t,l))return g(e,t,l)}else if("Tablet"===e){if(void 0!==i?.[0]?.[t]?.[2]&&""!==i?.[0]?.[t]?.[2])return i?.[0]?.[t]?.[2]+v(e,n,i,o,l);if(l&&g(e,t,l))return g(e,t,l)}return void 0!==n?.[0]?.[t]?.[2]&&""!==n?.[0]?.[t]?.[2]?n?.[0]?.[t]?.[2]+v(e,n,i,o,l):l&&g(e,t,l)?g(e,t,l):""}function c(e,t){return v(e,void 0!==t?.[0]?t?.[0]:[],void 0!==t?.[1]?t?.[1]:[],void 0!==t?.[2]?t?.[2]:[])}function v(e,t,n,i){let o=arguments.length>4&&void 0!==arguments[4]&&arguments[4];if("Mobile"===e){if(void 0!==i?.[0]?.unit&&""!==i?.[0]?.unit)return i[0].unit;if(void 0!==n?.[0]?.unit&&""!==n?.[0]?.unit)return n[0].unit;if(o&&c(e,o))return c(e,o)}else if("Tablet"===e){if(void 0!==n?.[0]?.unit&&""!==n?.[0]?.unit)return n[0].unit;if(o&&c(e,o))return c(e,o)}return void 0!==t?.[0]?.unit&&""!==t?.[0]?.unit?t[0].unit:o&&c(e,o)?c(e,o):"px"}const b=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"top",i=arguments.length>2?arguments[2]:void 0,o=arguments.length>3?arguments[3]:void 0,l=arguments.length>4?arguments[4]:void 0,r=arguments.length>5&&void 0!==arguments[5]&&arguments[5];return(0,n.useMemo)((()=>{const n=d(e,t,i,o,l,r);if(!n)return"";let u=a(e,t,i,o,l,r);u||(u="transparent");let g=s(e,t,i,o,l,r);return g||(g="solid"),n+" "+g+" "+u}),[e,t,i,o,l,r])};function m(e,t,n){return f(e,t,void 0!==n?.[0]?n?.[0]:[],void 0!==n?.[1]?n?.[1]:[],void 0!==n?.[2]?n?.[2]:[])}function f(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"top",n=arguments.length>2?arguments[2]:void 0,i=arguments.length>3?arguments[3]:void 0,o=arguments.length>4?arguments[4]:void 0,r=arguments.length>5&&void 0!==arguments[5]&&arguments[5];if("Mobile"===e){if(""!==o?.[0]?.[t]?.[0])return l(o?.[0]?.[t]?.[0]);if(""!==i?.[0]?.[t]?.[0])return l(i?.[0]?.[t]?.[0]);if(r&&m(e,t,r))return m(e,t,r)}else if("Tablet"===e){if(""!==i?.[0]?.[t]?.[0])return l(i?.[0]?.[t]?.[0]);if(r&&m(e,t,r))return m(e,t,r)}return""!==n?.[0]?.[t]?.[0]?l(n?.[0]?.[t]?.[0]):r&&m(e,t,r)?m(e,t,r):""}const p=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"top",i=arguments.length>2?arguments[2]:void 0,o=arguments.length>3?arguments[3]:void 0,l=arguments.length>4?arguments[4]:void 0,r=arguments.length>5&&void 0!==arguments[5]&&arguments[5];return(0,n.useMemo)((()=>f(e,t,i,o,l,r)||""),[e,t,i,o,l,r])},_=(e,t,n,i,o)=>{const l=void 0!==n[t]?n[t]:"",r=void 0!==i[t]?i[t]:"",a=void 0!==o[t]?o[t]:"";if("Mobile"===e){if(void 0!==a&&""!==a&&null!==a)return a;if(void 0!==r&&""!==r&&null!==r)return r}else if("Tablet"===e&&void 0!==r&&""!==r&&null!==r)return r;return l},h=function(e,t){let n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];const i=base_blocks_params.settings?JSON.parse(base_blocks_params.settings):{};let o={};void 0!==i[t]&&"object"==typeof i[t]&&(o=i[t]);const l=base_blocks_params.userrole?base_blocks_params.userrole:"admin";return void 0===o[e]?n:"all"===o[e]||"contributor"===o[e]&&("contributor"===l||"author"===l||"editor"===l||"admin"===l)||"author"===o[e]&&("author"===l||"editor"===l||"admin"===l)||"editor"===o[e]&&("editor"===l||"admin"===l)||"admin"===o[e]&&"admin"===l};function k(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return e&&e.startsWith("palette")||null===t||isNaN(t)||1===Number(t)||void 0===e||""===e||(e=o(e,t)),e}function S(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return e&&e.startsWith("palette")?e="var(--global-"+e+")":null===t||isNaN(t)||1===Number(t)||void 0===e||""===e||(e=o(e,t)),e}const z=window.lodash,y=window.wp.apiFetch;var x=e.n(y);const w=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:["x-wp-totalpages"];return new Promise((n=>{x()({...e,parse:!1}).then((e=>Promise.all([e.json?e.json():[],(0,z.zipObject)(t,t.map((t=>e.headers.get(t))))]))).then((e=>n(e))).catch((()=>{}))}))},O=e=>e.charAt(0).toUpperCase()+e.slice(1),M=function(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];try{var n=JSON.parse(e);if(n&&"object"==typeof n)return n}catch(e){}return e&&"object"==typeof e?e:!!t&&{}},L=window.base.icons,N=e=>{let t=e.toLowerCase();return"%"===t?L.percentIcon:"em"===t?L.emIcon:"vh"===t?L.vhIcon:"vw"===t?L.vwIcon:"rem"===t?L.remIcon:L.pxIcon},X=window.wp.i18n,I=[{value:"0",output:"0",label:(0,X.__)("None","gutenam-blocks"),size:0,name:(0,X.__)("None","gutenam-blocks")},{value:"xxs",output:"var(--global-bsb-spacing-xxs, 0.5rem)",size:8,label:(0,X.__)("XXS","gutenam-blocks"),name:(0,X.__)("2X Small","gutenam-blocks")},{value:"xs",output:"var(--global-bsb-spacing-xs, 1rem)",size:16,label:(0,X.__)("XS","gutenam-blocks"),name:(0,X.__)("X Small","gutenam-blocks")},{value:"sm",output:"var(--global-bsb-spacing-sm, 1.5rem)",size:24,label:(0,X.__)("SM","gutenam-blocks"),name:(0,X.__)("Small","gutenam-blocks")},{value:"md",output:"var(--global-bsb-spacing-md, 2rem)",size:32,label:(0,X.__)("MD","gutenam-blocks"),name:(0,X.__)("Medium","gutenam-blocks")},{value:"lg",output:"var(--global-bsb-spacing-lg, 3rem)",size:48,label:(0,X.__)("LG","gutenam-blocks"),name:(0,X.__)("Large","gutenam-blocks")},{value:"xl",output:"var(--global-bsb-spacing-xl, 4rem)",size:64,label:(0,X.__)("XL","gutenam-blocks"),name:(0,X.__)("X Large","gutenam-blocks")},{value:"xxl",output:"var(--global-bsb-spacing-xxl, 5rem)",size:80,label:(0,X.__)("XXL","gutenam-blocks"),name:(0,X.__)("2X Large","gutenam-blocks")},{value:"3xl",output:"var(--global-bsb-spacing-3xl, 6.5rem)",size:104,label:(0,X.__)("3XL","gutenam-blocks"),name:(0,X.__)("3X Large","gutenam-blocks")},{value:"4xl",output:"var(--global-bsb-spacing-4xl, 8rem)",size:128,label:(0,X.__)("4XL","gutenam-blocks"),name:(0,X.__)("4X Large","gutenam-blocks")},{value:"5xl",output:"var(--global-bsb-spacing-5xl, 10rem)",size:160,label:(0,X.__)("5XL","gutenam-blocks"),name:(0,X.__)("5X Large","gutenam-blocks")}],T=[{value:"sm",output:"var(--global-bsb-font-size-sm, 0.9rem)",size:14,label:(0,X.__)("SM","gutenam-blocks"),name:(0,X.__)("Small","gutenam-blocks")},{value:"md",output:"var(--global-bsb-font-size-md, 1.25rem)",size:20,label:(0,X.__)("MD","gutenam-blocks"),name:(0,X.__)("Medium","gutenam-blocks")},{value:"lg",output:"var(--global-bsb-font-size-lg, 2rem)",size:32,label:(0,X.__)("LG","gutenam-blocks"),name:(0,X.__)("Large","gutenam-blocks")},{value:"xl",output:"var(--global-bsb-font-size-xl, 3rem)",size:48,label:(0,X.__)("XL","gutenam-blocks"),name:(0,X.__)("X Large","gutenam-blocks")},{value:"xxl",output:"var(--global-bsb-font-size-xxl, 4rem)",size:64,label:(0,X.__)("2XL","gutenam-blocks"),name:(0,X.__)("2X Large","gutenam-blocks")},{value:"3xl",output:"var(--global-bsb-font-size-xxxl, 5rem)",size:80,label:(0,X.__)("3XL","gutenam-blocks"),name:(0,X.__)("3X Large","gutenam-blocks")}],j=[{value:"none",output:"var(--global-bsb-gap-none, 0px)",size:0,label:(0,X.__)("None","gutenam-blocks"),name:(0,X.__)("None","gutenam-blocks")},{value:"xs",output:"var(--global-bsb-gap-xs, 0.5rem)",size:8,label:(0,X.__)("XS","gutenam-blocks"),name:(0,X.__)("X Small","gutenam-blocks")},{value:"sm",output:"var(--global-bsb-gap-sm, 1rem)",size:16,label:(0,X.__)("SM","gutenam-blocks"),name:(0,X.__)("Small","gutenam-blocks")},{value:"md",output:"var(--global-bsb-gap-md, 2rem)",size:32,label:(0,X.__)("MD","gutenam-blocks"),name:(0,X.__)("Medium","gutenam-blocks")},{value:"lg",output:"var(--global-bsb-gap-lg, 4rem)",size:64,label:(0,X.__)("LG","gutenam-blocks"),name:(0,X.__)("Large","gutenam-blocks")}],P=document.body.classList.contains("rtl");function C(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:T;if(!e)return"";if(!n)return e;if("0"===e)return"0";const i=n.find((t=>t.value===e));return i?i.output:e+t}const D=(e,t,n)=>{let o="";if(void 0!==e&&void 0!==e[0]){const t=i(n,void 0!==e&&void 0!==e[0]&&void 0!==e[0].size&&void 0!==e[0].size[0]?e[0].size[0]:"",void 0!==e&&void 0!==e[0]&&void 0!==e[0].size&&void 0!==e[0].size[1]?e[0].size[1]:"",void 0!==e&&void 0!==e[0]&&void 0!==e[0].size&&void 0!==e[0].size[2]?e[0].size[2]:"");t&&(o=o+"font-size:"+C(t,void 0!==e[0].sizeType?e[0].sizeType:"px")+";");const l=i(n,void 0!==e&&void 0!==e[0]&&void 0!==e[0].lineHeight&&void 0!==e[0].lineHeight[0]?e[0].lineHeight[0]:"",void 0!==e&&void 0!==e[0]&&void 0!==e[0].lineHeight&&void 0!==e[0].lineHeight[1]?e[0].lineHeight[1]:"",void 0!==e&&void 0!==e[0]&&void 0!==e[0].lineHeight&&void 0!==e[0].lineHeight[2]?e[0].lineHeight[2]:"");l&&(o=o+"line-height:"+l+(void 0!==e[0].lineType?e[0].lineType:"")+";");const r=i(n,void 0!==e&&void 0!==e[0]&&void 0!==e[0].letterSpacing&&void 0!==e[0].letterSpacing[0]?e[0].letterSpacing[0]:"",void 0!==e&&void 0!==e[0]&&void 0!==e[0].letterSpacing&&void 0!==e[0].letterSpacing[1]?e[0].letterSpacing[1]:"",void 0!==e&&void 0!==e[0]&&void 0!==e[0].letterSpacing&&void 0!==e[0].letterSpacing[2]?e[0].letterSpacing[2]:"");r&&(o=o+"letter-spacing:"+r+(void 0!==e[0].letterSpacingType?e[0].letterSpacingType:"px")+";"),void 0!==e[0].weight&&""!==e[0].weight&&(o=o+"font-weight:"+e[0].weight+";"),void 0!==e[0].style&&""!==e[0].style&&(o=o+"font-style:"+e[0].style+";"),void 0!==e[0].textTransform&&""!==e[0].textTransform&&(o=o+"text-transform:"+e[0].textTransform+";"),void 0!==e[0].family&&""!==e[0].family&&(o=o+"font-family:"+e[0].family+";")}return o?t+"{"+o+"}":""},H=(e,t)=>{let n=(0,z.get)(e,[t,0]),i=(0,z.get)(e,[t,1]),o=(0,z.get)(e,[t,2]),l=(0,z.get)(e,[t,3]);return n===i&&n===o&&n===l?"linked":"individual"},A=(e,t)=>{if(!(t.uniqueID||void 0!==t.noCustomDefaults&&t.noCustomDefaults)){const n=base_blocks_params.config&&base_blocks_params.config[e]?base_blocks_params.config[e]:void 0,i=base_blocks_params.configuration?JSON.parse(base_blocks_params.configuration):[];void 0!==i[e]&&"object"==typeof i[e]?("base/iconlist"===e&&void 0!==i[e]?.items?.[0]?.icon&&i[e]?.items?.[0]?.icon&&!i[e]?.icon&&(t.icon=i[e]?.items?.[0]?.icon),Object.keys(i[e]).map((n=>{t[n]=i[e][n]}))):void 0!==n&&"object"==typeof n&&Object.keys(n).map((e=>{t[e]=n[e]}))}return t};function B(e,t,n,i){let o="_"+t.substr(2,9);return e?n(e)||i(e,t)?e:o:(n(o)||(o=(0,z.uniqueId)(o)),o)}function F(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],i={};const o=["uniqueID","inQueryBlock","anchor","noCustomDefaults"].concat(arguments.length>2&&void 0!==arguments[2]?arguments[2]:[]);return i=(0,z.omit)(e,o),n!==[]&&n.forEach((e=>{i[e]=[(0,z.head)(i[e])]})),Object.keys(i).map(((e,n)=>{void 0!==t[e]&&void 0!==t[e].default&&(0,z.isEqual)(i[e],t[e].default)&&delete i[e]})),i}function G(e,t){if(e&&(e.queryId||Number.isFinite(e.queryId))&&e.postId){if(!t)return!0}else if(t)return!1;return t}function q(){const[e,t]=(0,n.useState)(!1);return{isMouseOver:e,onMouseOver:()=>t(!0),onMouseOut:()=>t(!1)}}function E(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:I;if(!e)return(0,X.__)("None","gutenam-blocks");if(!n)return(0,X.__)("Unset","gutenam-blocks");if("0"===e)return(0,X.__)("None","gutenam-blocks");const i=n.find((t=>t.value===e));return i?i.name:e+t}function U(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:I;if(void 0===e)return"";if(!n)return e;if("0"===e)return"0"+t;if(0===e)return"0"+t;const i=n.find((t=>t.value===e));return i?i.output:e+t}function J(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:I;if(!e)return 0;if(!t)return e;if("0"===e)return 0;const n=t.find((t=>t.value===e));return n?n.size:e}function V(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:I;if(!e)return(0,X.__)("Unset","gutenam-blocks");if(!t)return(0,X.__)("Unset","gutenam-blocks");if("0"===e)return(0,X.__)("None","gutenam-blocks");const n=t.find((t=>t.size===e));return n?n.name:e+"px"}function W(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:I;if(!e)return"";if(!t)return"";if("0"===e)return"0";const n=t.find((t=>t.size===e));return n?n.value:e}function Z(e,t){if("object"!=typeof e||"object"!=typeof t)return!1;if(e.length!=t.length)return!1;for(let n=0;n<e.length;n++){const i=e[n],o=t[n];if(i&&!o||!i&&o)return!1}return!0}function Q(e,t){if("object"!=typeof e||"object"!=typeof t)return t;if(e.length!=t.length)return t;let n=null;for(let i=0;i<e.length;i++){const o=e[i],l=t[i];o!==l&&(n=l)}return n?t.map((e=>typeof e==typeof n?e:"")):t}function R(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:j;if(void 0===e)return"";if(!n)return e;if("0"===e)return"0"+t;if(0===e)return"0"+t;const i=n.find((t=>t.value===e));return i?i.output:e+t}window.wp.data,(this.base=this.base||{}).helpers=t})();