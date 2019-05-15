// This code is just really ugly and detracts from reading the component so I tucked it away.
// Just know if the phone number is in the valid format +1 (###) ###-### this will return true

export default number =>
  /^$/gm.test(number) === true ||
  (/\+1 \(\d{0}/gm.test(number) === true &&
    /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{4})(?:[-.x ]*(\d+))?)\S*$/gm.test(
      number
    ) === false);
