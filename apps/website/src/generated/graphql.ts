import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};

function fetcher<TData, TVariables>(
  client: GraphQLClient,
  query: string,
  variables?: TVariables,
  headers?: RequestInit['headers']
) {
  return async (): Promise<TData> =>
    client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** A string used to identify an i18n locale */
  I18NLocaleCode: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  contains?: InputMaybe<Scalars['Boolean']>;
  containsi?: InputMaybe<Scalars['Boolean']>;
  endsWith?: InputMaybe<Scalars['Boolean']>;
  eq?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['Boolean']>;
  gte?: InputMaybe<Scalars['Boolean']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  lt?: InputMaybe<Scalars['Boolean']>;
  lte?: InputMaybe<Scalars['Boolean']>;
  ne?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars['Boolean']>;
  notContainsi?: InputMaybe<Scalars['Boolean']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  startsWith?: InputMaybe<Scalars['Boolean']>;
};

export type Category = {
  __typename?: 'Category';
  createdAt?: Maybe<Scalars['DateTime']>;
  nazwa: Scalars['String'];
  placeholder?: Maybe<ComponentVoucherVoucher>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  vouchery?: Maybe<VoucherRelationResponseCollection>;
};

export type CategoryVoucheryArgs = {
  filters?: InputMaybe<VoucherFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type CategoryEntity = {
  __typename?: 'CategoryEntity';
  attributes?: Maybe<Category>;
  id?: Maybe<Scalars['ID']>;
};

export type CategoryEntityResponse = {
  __typename?: 'CategoryEntityResponse';
  data?: Maybe<CategoryEntity>;
};

export type CategoryEntityResponseCollection = {
  __typename?: 'CategoryEntityResponseCollection';
  data: Array<CategoryEntity>;
  meta: ResponseCollectionMeta;
};

export type CategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CategoryFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  nazwa?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<CategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CategoryFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  vouchery?: InputMaybe<VoucherFiltersInput>;
};

export type CategoryInput = {
  nazwa?: InputMaybe<Scalars['String']>;
  placeholder?: InputMaybe<ComponentVoucherVoucherInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  vouchery?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type CategoryRelationResponseCollection = {
  __typename?: 'CategoryRelationResponseCollection';
  data: Array<CategoryEntity>;
};

export type ComponentStronaBaner = {
  __typename?: 'ComponentStronaBaner';
  id: Scalars['ID'];
  podsumowanie: Scalars['String'];
  przycisk: Scalars['String'];
  tekst: Scalars['String'];
};

export type ComponentStronaBanerInput = {
  id?: InputMaybe<Scalars['ID']>;
  podsumowanie?: InputMaybe<Scalars['String']>;
  przycisk?: InputMaybe<Scalars['String']>;
  tekst?: InputMaybe<Scalars['String']>;
};

export type ComponentStronaHero = {
  __typename?: 'ComponentStronaHero';
  ctaButtonLabel: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  titleFirstLine: Scalars['String'];
  titleSecondLine: Scalars['String'];
};

export type ComponentStronaHeroInput = {
  ctaButtonLabel?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  titleFirstLine?: InputMaybe<Scalars['String']>;
  titleSecondLine?: InputMaybe<Scalars['String']>;
};

export type ComponentStronaSekcja = {
  __typename?: 'ComponentStronaSekcja';
  id: Scalars['ID'];
  opis: Scalars['String'];
  tytul: Scalars['String'];
};

export type ComponentStronaSekcjaFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentStronaSekcjaFiltersInput>>>;
  not?: InputMaybe<ComponentStronaSekcjaFiltersInput>;
  opis?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentStronaSekcjaFiltersInput>>>;
  tytul?: InputMaybe<StringFilterInput>;
};

export type ComponentStronaSekcjaInput = {
  id?: InputMaybe<Scalars['ID']>;
  opis?: InputMaybe<Scalars['String']>;
  tytul?: InputMaybe<Scalars['String']>;
};

export type ComponentVoucherVoucher = {
  __typename?: 'ComponentVoucherVoucher';
  id: Scalars['ID'];
  tytul: Scalars['String'];
  zdjecie: UploadFileEntityResponse;
};

export type ComponentVoucherVoucherInput = {
  id?: InputMaybe<Scalars['ID']>;
  tytul?: InputMaybe<Scalars['String']>;
  zdjecie?: InputMaybe<Scalars['ID']>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  contains?: InputMaybe<Scalars['DateTime']>;
  containsi?: InputMaybe<Scalars['DateTime']>;
  endsWith?: InputMaybe<Scalars['DateTime']>;
  eq?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  ne?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars['DateTime']>;
  notContainsi?: InputMaybe<Scalars['DateTime']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  startsWith?: InputMaybe<Scalars['DateTime']>;
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  contains?: InputMaybe<Scalars['Float']>;
  containsi?: InputMaybe<Scalars['Float']>;
  endsWith?: InputMaybe<Scalars['Float']>;
  eq?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  ne?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars['Float']>;
  notContainsi?: InputMaybe<Scalars['Float']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  startsWith?: InputMaybe<Scalars['Float']>;
};

export type GenericMorph =
  | Category
  | ComponentStronaBaner
  | ComponentStronaHero
  | ComponentStronaSekcja
  | ComponentVoucherVoucher
  | I18NLocale
  | Regulamin
  | StronaDomowa
  | UploadFile
  | UsersPermissionsPermission
  | UsersPermissionsRole
  | UsersPermissionsUser
  | Voucher;

export type I18NLocale = {
  __typename?: 'I18NLocale';
  code?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type I18NLocaleEntity = {
  __typename?: 'I18NLocaleEntity';
  attributes?: Maybe<I18NLocale>;
  id?: Maybe<Scalars['ID']>;
};

export type I18NLocaleEntityResponse = {
  __typename?: 'I18NLocaleEntityResponse';
  data?: Maybe<I18NLocaleEntity>;
};

export type I18NLocaleEntityResponseCollection = {
  __typename?: 'I18NLocaleEntityResponseCollection';
  data: Array<I18NLocaleEntity>;
  meta: ResponseCollectionMeta;
};

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<I18NLocaleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  contains?: InputMaybe<Scalars['ID']>;
  containsi?: InputMaybe<Scalars['ID']>;
  endsWith?: InputMaybe<Scalars['ID']>;
  eq?: InputMaybe<Scalars['ID']>;
  gt?: InputMaybe<Scalars['ID']>;
  gte?: InputMaybe<Scalars['ID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  lt?: InputMaybe<Scalars['ID']>;
  lte?: InputMaybe<Scalars['ID']>;
  ne?: InputMaybe<Scalars['ID']>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars['ID']>;
  notContainsi?: InputMaybe<Scalars['ID']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  startsWith?: InputMaybe<Scalars['ID']>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  contains?: InputMaybe<Scalars['Int']>;
  containsi?: InputMaybe<Scalars['Int']>;
  endsWith?: InputMaybe<Scalars['Int']>;
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  ne?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars['Int']>;
  notContainsi?: InputMaybe<Scalars['Int']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  startsWith?: InputMaybe<Scalars['Int']>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  contains?: InputMaybe<Scalars['JSON']>;
  containsi?: InputMaybe<Scalars['JSON']>;
  endsWith?: InputMaybe<Scalars['JSON']>;
  eq?: InputMaybe<Scalars['JSON']>;
  gt?: InputMaybe<Scalars['JSON']>;
  gte?: InputMaybe<Scalars['JSON']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  lt?: InputMaybe<Scalars['JSON']>;
  lte?: InputMaybe<Scalars['JSON']>;
  ne?: InputMaybe<Scalars['JSON']>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars['JSON']>;
  notContainsi?: InputMaybe<Scalars['JSON']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  startsWith?: InputMaybe<Scalars['JSON']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory?: Maybe<CategoryEntityResponse>;
  createRegulaminLocalization?: Maybe<RegulaminEntityResponse>;
  createStronaDomowaLocalization?: Maybe<StronaDomowaEntityResponse>;
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  createVoucher?: Maybe<VoucherEntityResponse>;
  deleteCategory?: Maybe<CategoryEntityResponse>;
  deleteRegulamin?: Maybe<RegulaminEntityResponse>;
  deleteStronaDomowa?: Maybe<StronaDomowaEntityResponse>;
  deleteUploadFile?: Maybe<UploadFileEntityResponse>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteVoucher?: Maybe<VoucherEntityResponse>;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  removeFile?: Maybe<UploadFileEntityResponse>;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateCategory?: Maybe<CategoryEntityResponse>;
  updateFileInfo: UploadFileEntityResponse;
  updateRegulamin?: Maybe<RegulaminEntityResponse>;
  updateStronaDomowa?: Maybe<StronaDomowaEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  updateVoucher?: Maybe<VoucherEntityResponse>;
  upload: UploadFileEntityResponse;
};

export type MutationCreateCategoryArgs = {
  data: CategoryInput;
};

export type MutationCreateRegulaminLocalizationArgs = {
  data?: InputMaybe<RegulaminInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type MutationCreateStronaDomowaLocalizationArgs = {
  data?: InputMaybe<StronaDomowaInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type MutationCreateUploadFileArgs = {
  data: UploadFileInput;
};

export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};

export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};

export type MutationCreateVoucherArgs = {
  data: VoucherInput;
};

export type MutationDeleteCategoryArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteRegulaminArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type MutationDeleteStronaDomowaArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type MutationDeleteUploadFileArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteVoucherArgs = {
  id: Scalars['ID'];
};

export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String'];
};

export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};

export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};

export type MutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  files: Array<InputMaybe<Scalars['Upload']>>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
};

export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};

export type MutationRemoveFileArgs = {
  id: Scalars['ID'];
};

export type MutationResetPasswordArgs = {
  code: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};

export type MutationUpdateCategoryArgs = {
  data: CategoryInput;
  id: Scalars['ID'];
};

export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID'];
  info?: InputMaybe<FileInfoInput>;
};

export type MutationUpdateRegulaminArgs = {
  data: RegulaminInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type MutationUpdateStronaDomowaArgs = {
  data: StronaDomowaInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};

export type MutationUpdateUploadFileArgs = {
  data: UploadFileInput;
  id: Scalars['ID'];
};

export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars['ID'];
};

export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars['ID'];
};

export type MutationUpdateVoucherArgs = {
  data: VoucherInput;
  id: Scalars['ID'];
};

export type MutationUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  file: Scalars['Upload'];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
};

export type Pagination = {
  __typename?: 'Pagination';
  page: Scalars['Int'];
  pageCount: Scalars['Int'];
  pageSize: Scalars['Int'];
  total: Scalars['Int'];
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
};

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW',
}

export type Query = {
  __typename?: 'Query';
  categories?: Maybe<CategoryEntityResponseCollection>;
  category?: Maybe<CategoryEntityResponse>;
  i18NLocale?: Maybe<I18NLocaleEntityResponse>;
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
  regulamin?: Maybe<RegulaminEntityResponse>;
  stronaDomowa?: Maybe<StronaDomowaEntityResponse>;
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
  voucher?: Maybe<VoucherEntityResponse>;
  vouchers?: Maybe<VoucherEntityResponseCollection>;
};

export type QueryCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type QueryCategoryArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type QueryI18NLocaleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type QueryRegulaminArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  publicationState?: InputMaybe<PublicationState>;
};

export type QueryStronaDomowaArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  publicationState?: InputMaybe<PublicationState>;
};

export type QueryUploadFileArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type QueryUsersPermissionsRoleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type QueryUsersPermissionsUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type QueryVoucherArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type QueryVouchersArgs = {
  filters?: InputMaybe<VoucherFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Regulamin = {
  __typename?: 'Regulamin';
  createdAt?: Maybe<Scalars['DateTime']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<RegulaminRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  sekcja: Array<Maybe<ComponentStronaSekcja>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type RegulaminLocalizationsArgs = {
  publicationState?: InputMaybe<PublicationState>;
};

export type RegulaminSekcjaArgs = {
  filters?: InputMaybe<ComponentStronaSekcjaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type RegulaminEntity = {
  __typename?: 'RegulaminEntity';
  attributes?: Maybe<Regulamin>;
  id?: Maybe<Scalars['ID']>;
};

export type RegulaminEntityResponse = {
  __typename?: 'RegulaminEntityResponse';
  data?: Maybe<RegulaminEntity>;
};

export type RegulaminInput = {
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  sekcja?: InputMaybe<Array<InputMaybe<ComponentStronaSekcjaInput>>>;
};

export type RegulaminRelationResponseCollection = {
  __typename?: 'RegulaminRelationResponseCollection';
  data: Array<RegulaminEntity>;
};

export type ResponseCollectionMeta = {
  __typename?: 'ResponseCollectionMeta';
  pagination: Pagination;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contains?: InputMaybe<Scalars['String']>;
  containsi?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  ne?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars['String']>;
  notContainsi?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StronaDomowa = {
  __typename?: 'StronaDomowa';
  baner?: Maybe<ComponentStronaBaner>;
  createdAt?: Maybe<Scalars['DateTime']>;
  hero?: Maybe<ComponentStronaHero>;
  kategorie?: Maybe<CategoryRelationResponseCollection>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<StronaDomowaRelationResponseCollection>;
  oNas?: Maybe<ComponentStronaSekcja>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type StronaDomowaKategorieArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type StronaDomowaLocalizationsArgs = {
  publicationState?: InputMaybe<PublicationState>;
};

export type StronaDomowaEntity = {
  __typename?: 'StronaDomowaEntity';
  attributes?: Maybe<StronaDomowa>;
  id?: Maybe<Scalars['ID']>;
};

export type StronaDomowaEntityResponse = {
  __typename?: 'StronaDomowaEntityResponse';
  data?: Maybe<StronaDomowaEntity>;
};

export type StronaDomowaInput = {
  baner?: InputMaybe<ComponentStronaBanerInput>;
  hero?: InputMaybe<ComponentStronaHeroInput>;
  kategorie?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  oNas?: InputMaybe<ComponentStronaSekcjaInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
};

export type StronaDomowaRelationResponseCollection = {
  __typename?: 'StronaDomowaRelationResponseCollection';
  data: Array<StronaDomowaEntity>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  ext?: Maybe<Scalars['String']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  height?: Maybe<Scalars['Int']>;
  mime: Scalars['String'];
  name: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars['Float'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};

export type UploadFileEntity = {
  __typename?: 'UploadFileEntity';
  attributes?: Maybe<UploadFile>;
  id?: Maybe<Scalars['ID']>;
};

export type UploadFileEntityResponse = {
  __typename?: 'UploadFileEntityResponse';
  data?: Maybe<UploadFileEntity>;
};

export type UploadFileEntityResponseCollection = {
  __typename?: 'UploadFileEntityResponseCollection';
  data: Array<UploadFileEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  mime?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type UploadFileInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  ext?: InputMaybe<Scalars['String']>;
  formats?: InputMaybe<Scalars['JSON']>;
  hash?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Int']>;
  mime?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  previewUrl?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  provider_metadata?: InputMaybe<Scalars['JSON']>;
  size?: InputMaybe<Scalars['Float']>;
  url?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Int']>;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: 'UsersPermissionsCreateRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: 'UsersPermissionsDeleteRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String'];
  password: Scalars['String'];
  provider?: Scalars['String'];
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt?: Maybe<Scalars['String']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars['String'];
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};

export type UsersPermissionsPasswordPayload = {
  __typename?: 'UsersPermissionsPasswordPayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsPermissionEntity = {
  __typename?: 'UsersPermissionsPermissionEntity';
  attributes?: Maybe<UsersPermissionsPermission>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: 'UsersPermissionsPermissionRelationResponseCollection';
  data: Array<UsersPermissionsPermissionEntity>;
};

export type UsersPermissionsRegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};

export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UsersPermissionsRoleEntity = {
  __typename?: 'UsersPermissionsRoleEntity';
  attributes?: Maybe<UsersPermissionsRole>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsRoleEntityResponse = {
  __typename?: 'UsersPermissionsRoleEntityResponse';
  data?: Maybe<UsersPermissionsRoleEntity>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: 'UsersPermissionsRoleEntityResponseCollection';
  data: Array<UsersPermissionsRoleEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  type?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: 'UsersPermissionsUpdateRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  provider?: Maybe<Scalars['String']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
};

export type UsersPermissionsUserEntity = {
  __typename?: 'UsersPermissionsUserEntity';
  attributes?: Maybe<UsersPermissionsUser>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsUserEntityResponse = {
  __typename?: 'UsersPermissionsUserEntityResponse';
  data?: Maybe<UsersPermissionsUserEntity>;
};

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: 'UsersPermissionsUserEntityResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  blocked?: InputMaybe<BooleanFilterInput>;
  confirmationToken?: InputMaybe<StringFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  password?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  resetPasswordToken?: InputMaybe<StringFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  blocked?: InputMaybe<Scalars['Boolean']>;
  confirmationToken?: InputMaybe<Scalars['String']>;
  confirmed?: InputMaybe<Scalars['Boolean']>;
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  resetPasswordToken?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['ID']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
};

export type Voucher = {
  __typename?: 'Voucher';
  createdAt?: Maybe<Scalars['DateTime']>;
  kategorie?: Maybe<CategoryRelationResponseCollection>;
  opis?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  tytul: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  zdjecie: UploadFileEntityResponse;
};

export type VoucherKategorieArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type VoucherEntity = {
  __typename?: 'VoucherEntity';
  attributes?: Maybe<Voucher>;
  id?: Maybe<Scalars['ID']>;
};

export type VoucherEntityResponse = {
  __typename?: 'VoucherEntityResponse';
  data?: Maybe<VoucherEntity>;
};

export type VoucherEntityResponseCollection = {
  __typename?: 'VoucherEntityResponseCollection';
  data: Array<VoucherEntity>;
  meta: ResponseCollectionMeta;
};

export type VoucherFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<VoucherFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  kategorie?: InputMaybe<CategoryFiltersInput>;
  not?: InputMaybe<VoucherFiltersInput>;
  opis?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<VoucherFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  tytul?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type VoucherInput = {
  kategorie?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  opis?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  tytul?: InputMaybe<Scalars['String']>;
  zdjecie?: InputMaybe<Scalars['ID']>;
};

export type VoucherRelationResponseCollection = {
  __typename?: 'VoucherRelationResponseCollection';
  data: Array<VoucherEntity>;
};

export type HomePageQueryVariables = Exact<{ [key: string]: never }>;

export type HomePageQuery = {
  __typename?: 'Query';
  stronaDomowa?: {
    __typename?: 'StronaDomowaEntityResponse';
    data?: {
      __typename?: 'StronaDomowaEntity';
      attributes?: {
        __typename?: 'StronaDomowa';
        hero?: {
          __typename?: 'ComponentStronaHero';
          titleFirstLine: string;
          titleSecondLine: string;
          description?: string | null;
          ctaButtonLabel: string;
        } | null;
        oNas?: {
          __typename?: 'ComponentStronaSekcja';
          tytul: string;
          opis: string;
        } | null;
        kategorie?: {
          __typename?: 'CategoryRelationResponseCollection';
          data: Array<{
            __typename?: 'CategoryEntity';
            id?: string | null;
            attributes?: {
              __typename?: 'Category';
              nazwa: string;
              placeholder?: {
                __typename?: 'ComponentVoucherVoucher';
                tytul: string;
                zdjecie: {
                  __typename?: 'UploadFileEntityResponse';
                  data?: {
                    __typename?: 'UploadFileEntity';
                    attributes?: {
                      __typename?: 'UploadFile';
                      name: string;
                      alternativeText?: string | null;
                      url: string;
                      previewUrl?: string | null;
                    } | null;
                  } | null;
                };
              } | null;
              vouchery?: {
                __typename?: 'VoucherRelationResponseCollection';
                data: Array<{
                  __typename?: 'VoucherEntity';
                  attributes?: {
                    __typename?: 'Voucher';
                    tytul: string;
                    zdjecie: {
                      __typename?: 'UploadFileEntityResponse';
                      data?: {
                        __typename?: 'UploadFileEntity';
                        attributes?: {
                          __typename?: 'UploadFile';
                          name: string;
                          alternativeText?: string | null;
                          url: string;
                          previewUrl?: string | null;
                        } | null;
                      } | null;
                    };
                  } | null;
                }>;
              } | null;
            } | null;
          }>;
        } | null;
        baner?: {
          __typename?: 'ComponentStronaBaner';
          tekst: string;
          podsumowanie: string;
          przycisk: string;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type RegulaminQueryVariables = Exact<{ [key: string]: never }>;

export type RegulaminQuery = {
  __typename?: 'Query';
  regulamin?: {
    __typename?: 'RegulaminEntityResponse';
    data?: {
      __typename?: 'RegulaminEntity';
      attributes?: {
        __typename?: 'Regulamin';
        sekcja: Array<{
          __typename?: 'ComponentStronaSekcja';
          id: string;
          tytul: string;
          opis: string;
        } | null>;
      } | null;
    } | null;
  } | null;
};

export const HomePageDocument = `
    query HomePage {
  stronaDomowa {
    data {
      attributes {
        hero {
          titleFirstLine
          titleSecondLine
          description
          ctaButtonLabel
        }
        oNas {
          tytul
          opis
        }
        kategorie {
          data {
            id
            attributes {
              nazwa
              placeholder {
                tytul
                zdjecie {
                  data {
                    attributes {
                      name
                      alternativeText
                      url
                      previewUrl
                    }
                  }
                }
              }
              vouchery {
                data {
                  attributes {
                    tytul
                    zdjecie {
                      data {
                        attributes {
                          name
                          alternativeText
                          url
                          previewUrl
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        baner {
          tekst
          podsumowanie
          przycisk
        }
      }
    }
  }
}
    `;
export const useHomePageQuery = <TData = HomePageQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: HomePageQueryVariables,
  options?: UseQueryOptions<HomePageQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<HomePageQuery, TError, TData>(
    variables === undefined ? ['HomePage'] : ['HomePage', variables],
    fetcher<HomePageQuery, HomePageQueryVariables>(
      client,
      HomePageDocument,
      variables,
      headers
    ),
    options
  );

useHomePageQuery.getKey = (variables?: HomePageQueryVariables) =>
  variables === undefined ? ['HomePage'] : ['HomePage', variables];
useHomePageQuery.fetcher = (
  client: GraphQLClient,
  variables?: HomePageQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<HomePageQuery, HomePageQueryVariables>(
    client,
    HomePageDocument,
    variables,
    headers
  );
export const RegulaminDocument = `
    query Regulamin {
  regulamin {
    data {
      attributes {
        sekcja {
          id
          tytul
          opis
        }
      }
    }
  }
}
    `;
export const useRegulaminQuery = <TData = RegulaminQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: RegulaminQueryVariables,
  options?: UseQueryOptions<RegulaminQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<RegulaminQuery, TError, TData>(
    variables === undefined ? ['Regulamin'] : ['Regulamin', variables],
    fetcher<RegulaminQuery, RegulaminQueryVariables>(
      client,
      RegulaminDocument,
      variables,
      headers
    ),
    options
  );

useRegulaminQuery.getKey = (variables?: RegulaminQueryVariables) =>
  variables === undefined ? ['Regulamin'] : ['Regulamin', variables];
useRegulaminQuery.fetcher = (
  client: GraphQLClient,
  variables?: RegulaminQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<RegulaminQuery, RegulaminQueryVariables>(
    client,
    RegulaminDocument,
    variables,
    headers
  );
