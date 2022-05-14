/*
1155125519 Hon Wing Ngai	1155143564 Chiu Chak San	1155126052 Kong Ho Pak 
1155136412 Pau Chun Wai	    1155143814 Lam Tsz Hoi	
*/

const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
