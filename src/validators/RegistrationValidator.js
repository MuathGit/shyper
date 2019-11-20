import errors from '../constants/ErrorConstants'
import {validators} from './ValidationUtil'



export const slefRegValidators = {
  'organizationId': [
        validators.required(errors.REQUIRED),
        validators.numeric(errors.NUMERIC),
        validators.moiOrNin(errors.MOI)
  ],
  'residentsId': [
    validators.required(errors.REQUIRED),
    validators.numeric(errors.NUMERIC),
    validators.iqama(errors.IQAMA),

  ],
    'sponsoredNumber': [
        validators.required(errors.REQUIRED),
        validators.numeric(errors.NUMERIC),
        validators.iqama(errors.NIN_OR_IQAMA),

    ],
    'idNumber': [
        validators.required(errors.REQUIRED),
        validators.numeric(errors.NUMERIC),
        validators.iqama(errors.NIN_OR_IQAMA)
    ],
    'birthDate': [
        validators.required(errors.REQUIRED),
        validators.date(errors.DATE_FORMAT),
    ],
    'email': [
        validators.required(errors.REQUIRED),
        validators.email(errors.EMAIL_FORMAT),
    ],
    'mobileNumber': [
        validators.required(errors.REQUIRED),
        validators.mobile(errors.MOBILE),
    ],
    'agreementForm': [
        validators.required(errors.REQUIRED),
    ],
    'cr': [
        validators.required(errors.REQUIRED),
    ],
    'postalCode': [
        validators.required(errors.REQUIRED),
        validators.numeric(errors.NUMERIC),
    ],
    'phoneNumber': [
        validators.required(errors.REQUIRED),
        validators.numeric(errors.NUMERIC),
        validators.phone(errors.PHONE_NUMBER),
    ],
    'faxNumber': [
        validators.required(errors.REQUIRED),
        validators.numeric(errors.NUMERIC),
    ],
  'location': [
    validators.istrue(errors.GOOGLE_MAP_REQUIRED),
  ],
    'termsAndConditions': [
        validators.istrue(errors.TERMS_REQUIRED),
    ],
}


export const nonGovTypeValidators = {
    'organizationId': [
        validators.required(errors.REQUIRED),
        validators.numeric(errors.NUMERIC),
        validators.moiOrNin(errors.MOI)
    ],
    'residentsId': [
        validators.required(errors.REQUIRED),
        validators.numeric(errors.NUMERIC),
        validators.iqama(errors.IQAMA),

    ],
    'crNumber': [
        validators.required(errors.REQUIRED),
        validators.numeric(errors.NUMERIC),
    ],
    'crIssueDate': [
        validators.required(errors.REQUIRED),
        validators.date(errors.DATE_FORMAT),
    ],
    'crEndDate': [
        validators.required(errors.REQUIRED),
        validators.date(errors.DATE_FORMAT),
    ],
    'sponsoredNumber': [
        validators.required(errors.REQUIRED),
        validators.numeric(errors.NUMERIC),
        validators.iqama(errors.NIN_OR_IQAMA),

    ],
    'idNumber': [
        validators.required(errors.REQUIRED),
        validators.numeric(errors.NUMERIC),
        validators.iqama(errors.NIN_OR_IQAMA)
    ],
    'birthDate': [
        validators.required(errors.REQUIRED),
        validators.date(errors.DATE_FORMAT),
    ],
    'email': [
        validators.required(errors.REQUIRED),
        validators.email(errors.EMAIL_FORMAT),
    ],
    'mobileNumber': [
        validators.required(errors.REQUIRED),
        validators.mobile(errors.MOBILE),
    ],
    'agreementForm': [
        validators.required(errors.REQUIRED),
    ],
    'cr': [
        validators.required(errors.REQUIRED),
    ],
    'postalCode': [
        validators.required(errors.REQUIRED),
        validators.numeric(errors.NUMERIC),
    ],
    'phoneNumber': [
        validators.required(errors.REQUIRED),
        validators.numeric(errors.NUMERIC),
        validators.phone(errors.PHONE_NUMBER),
    ],
    'faxNumber': [
        validators.required(errors.REQUIRED),
        validators.numeric(errors.NUMERIC),
    ],
    'location': [
        validators.istrue(errors.GOOGLE_MAP_REQUIRED),
    ],
    'termsAndConditions': [
        validators.istrue(errors.TERMS_REQUIRED),
    ],

}