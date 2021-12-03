export const PAmodel = {
    NumberOfAdultTag: 1,
    NumberOfChildrenTag: 1,
    SumInsuredTag: "S$100,000",
    OwnerOccupationTag: "White Collar",
    SpouseOccupationTag: "White Collar",
    AdditionalCoverDailyHospitalTag: false,
    AdditionalCoverWeeklyIncomeTag: false,
    AdditionalCoverDamageToPersonalTag: false,
    AdditionalCoverAdditionalPermanentTag: false,
    AdditionalCoverMedicalExpensesTag: false,
    AdditionalCoverEnhancedPermanentTag: false,
    PursuitsOfProposedQuestionTag: false,
    LifeStyleOfProposedQuestionTag: false,
    HealthDisabledProposedInsuredTag: false,
    HealthDisabledSpouseProposedInsuredTag: false,
    HealthDisabledChild1ProposedInsuredTag: false,
    HealthDisabledChild2ProposedInsuredTag: false,
    HealthDisabledChild3ProposedInsuredTag: false,
    HealthDisabledChild4ProposedInsuredTag: false,
    MilitaryProposedInsuredTag: false,
    MilitarySpouseProposedInsuredTag: false,
    MilitaryChild1ProposedInsuredTag: false,
    MilitaryChild2ProposedInsuredTag: false,
    MilitaryChild3ProposedInsuredTag: false,
    MilitaryChild4ProposedInsuredTag: false,
    InsuredCompanyOwnerTag: null,
    InsuredCompanyProposedTag: null,
    DeathOwnerTag: null,
    DeathProposedTag: null,
    PAOwnerTag: null,
    PAProposedTag: null,
    OthersOwnerTag: null,
    OthersProposedTag: null,
    RemarkTag: null,
    LifeStyleOfProposedArrayTag: [
        {
            country: null,
            frequency: null,
            duration: null
        }
    ]
}
export const PAview = `<div class="row">
<div class="mx-4 my-2 col">
    <h5>Number Of Adult</h5>
    <select (change)="onChange($event.target, 'numberOfAdult')">
        <option value='1' selected>1</option>
        <option value='2'>2</option>
    </select>
    <h5>My Occupation Group</h5>
    <select (change)="onChange($event.target, 'OwnerOccupationTag')">
        <option value='White Collar' selected>White Collar</option>
        <option value='Sales'>Sales</option>
        <option value='Skilled & Semi-skilled Manual Worker'>Skilled & Semi-skilled Manual Worker</option>
        <option value='Heavy Manual'>Heavy Manual</option>
    </select>
    <h5>My Spouse's Occupation Group</h5>
    <select (change)="onChange($event.target, 'SpouseOccupationTag')">
        <option value='White Collar' selected>White Collar</option>
        <option value='Sales'>Sales</option>
        <option value='Skilled & Semi-skilled Manual Worker'>Skilled & Semi-skilled Manual Worker</option>
        <option value='Heavy Manual'>Heavy Manual</option>
    </select>
</div>
<div class="mx-2 my-2 col">
    <h5>Sum Insured For Each Adult</h5>
    <select (change)="onChange($event.target, 'SumInsuredTag')">
        <option value='S$100,000' selected>S$100,000</option>
        <option value='S$200,000'>S$200,000</option>
        <option value='S$300,000'>S$300,000</option>
        <option value='S$500,000'>S$500,000</option>
        <option value='S$1,000,000'>S$1,000,000</option>
    </select>
    <h5>Number Of Children</h5>
    <select (change)="onChange($event.target, 'NumberOfChildrenTag')">
        <option value='1' selected>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
        <option value='6'>6</option>
        <option value='7'>7</option>
        <option value='8'>8</option>
        <option value='9'>9</option>
        <option value='10'>10</option>
    </select>
</div>
</div>`
export const PAattribute= {
    salesChannel: "saleschannel-2fe2035a-2b37-08d9-d774-317595729ecf",
    salesChannelName: "SalesLab",
    productVersionId: "productversion-05f02bdb-2b28-08d9-5e7d-e17af1c50fcd",
    productName: "Personal Accident Insurance - SalesLab",
    productId: "product-ec7b818d-2b27-08d9-6f58-3d38e85eb6cb"
  }
export const CTPLmodel = {
    CarMakeAndModelTag: null,
    CarPlateNumberTag: null,
    CarPlateTag: false,
    CarRegisterTag: null,
    CarRegisterYearTag: 0,
    CustomerAddressTag: null,
    CustomerDOBTag: null,
    CustomerFullNameTag: null,
    CustomerGenderTag: null,
    CustomerMaritalStatusTag: null,
    CustomerNRICTag: null,
    CustomerPhoneNumberTag: null,
    CustomerPostalCodeTag: null,
    DemeritPointsTag: null,
    DriverAgeTag: 0,
    DrivingOverseasTag: false,
    DrivingYearTag: null,
    ExcessAmountTag: 750,
    NoClaimsDiscountTag: null,
    NoOfClaimsTag: null,
    PreferWorkshopTag: "No",
    PremiumPlanTag: "Classic",
    WaiveYoungDriverTag: "No"
}
export const CTPLview = `<div class="row">
<div class="mx-4 my-2 col">
    <h5>Number Of Adult</h5>
    <select (change)="onChange($event.target, 'numberOfAdult')">
        <option value='1' selected>1</option>
        <option value='2'>2</option>
    </select>
    <h5>My Occupation Group</h5>
    <select (change)="onChange($event.target, 'OwnerOccupationTag')">
        <option value='White Collar' selected>White Collar</option>
        <option value='Sales'>Sales</option>
        <option value='Skilled & Semi-skilled Manual Worker'>Skilled & Semi-skilled Manual Worker</option>
        <option value='Heavy Manual'>Heavy Manual</option>
    </select>
    <h5>My Spouse's Occupation Group</h5>
    <select (change)="onChange($event.target, 'SpouseOccupationTag')">
        <option value='White Collar' selected>White Collar</option>
        <option value='Sales'>Sales</option>
        <option value='Skilled & Semi-skilled Manual Worker'>Skilled & Semi-skilled Manual Worker</option>
        <option value='Heavy Manual'>Heavy Manual</option>
    </select>
</div>
<div class="mx-2 my-2 col">
    <h5>Sum Insured For Each Adult</h5>
    <select (change)="onChange($event.target, 'SumInsuredTag')">
        <option value='S$100,000' selected>S$100,000</option>
        <option value='S$200,000'>S$200,000</option>
        <option value='S$300,000'>S$300,000</option>
        <option value='S$500,000'>S$500,000</option>
        <option value='S$1,000,000'>S$1,000,000</option>
    </select>
    <h5>Number Of Children</h5>
    <select (change)="onChange($event.target, 'NumberOfChildrenTag')">
        <option value='1' selected>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
        <option value='6'>6</option>
        <option value='7'>7</option>
        <option value='8'>8</option>
        <option value='9'>9</option>
        <option value='10'>10</option>
    </select>
</div>
</div>`