/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/': {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  '/campaigns': {
    get: {
      parameters: {
        query: {
          id?: parameters['rowFilter.campaigns.id'];
          created_at?: parameters['rowFilter.campaigns.created_at'];
          name?: parameters['rowFilter.campaigns.name'];
          description?: parameters['rowFilter.campaigns.description'];
          price?: parameters['rowFilter.campaigns.price'];
          localization?: parameters['rowFilter.campaigns.localization'];
          fk_category_id?: parameters['rowFilter.campaigns.fk_category_id'];
          fk_merchant_id?: parameters['rowFilter.campaigns.fk_merchant_id'];
          date_start?: parameters['rowFilter.campaigns.date_start'];
          date_end?: parameters['rowFilter.campaigns.date_end'];
          published?: parameters['rowFilter.campaigns.published'];
          /** Filtering Columns */
          select?: parameters['select'];
          /** Ordering */
          order?: parameters['order'];
          /** Limiting and Pagination */
          offset?: parameters['offset'];
          /** Limiting and Pagination */
          limit?: parameters['limit'];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters['range'];
          /** Limiting and Pagination */
          'Range-Unit'?: parameters['rangeUnit'];
          /** Preference */
          Prefer?: parameters['preferCount'];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions['campaigns'][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** campaigns */
          campaigns?: definitions['campaigns'];
        };
        query: {
          /** Filtering Columns */
          select?: parameters['select'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters['rowFilter.campaigns.id'];
          created_at?: parameters['rowFilter.campaigns.created_at'];
          name?: parameters['rowFilter.campaigns.name'];
          description?: parameters['rowFilter.campaigns.description'];
          price?: parameters['rowFilter.campaigns.price'];
          localization?: parameters['rowFilter.campaigns.localization'];
          fk_category_id?: parameters['rowFilter.campaigns.fk_category_id'];
          fk_merchant_id?: parameters['rowFilter.campaigns.fk_merchant_id'];
          date_start?: parameters['rowFilter.campaigns.date_start'];
          date_end?: parameters['rowFilter.campaigns.date_end'];
          published?: parameters['rowFilter.campaigns.published'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters['rowFilter.campaigns.id'];
          created_at?: parameters['rowFilter.campaigns.created_at'];
          name?: parameters['rowFilter.campaigns.name'];
          description?: parameters['rowFilter.campaigns.description'];
          price?: parameters['rowFilter.campaigns.price'];
          localization?: parameters['rowFilter.campaigns.localization'];
          fk_category_id?: parameters['rowFilter.campaigns.fk_category_id'];
          fk_merchant_id?: parameters['rowFilter.campaigns.fk_merchant_id'];
          date_start?: parameters['rowFilter.campaigns.date_start'];
          date_end?: parameters['rowFilter.campaigns.date_end'];
          published?: parameters['rowFilter.campaigns.published'];
        };
        body: {
          /** campaigns */
          campaigns?: definitions['campaigns'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  '/categories': {
    get: {
      parameters: {
        query: {
          id?: parameters['rowFilter.categories.id'];
          created_at?: parameters['rowFilter.categories.created_at'];
          name?: parameters['rowFilter.categories.name'];
          /** Filtering Columns */
          select?: parameters['select'];
          /** Ordering */
          order?: parameters['order'];
          /** Limiting and Pagination */
          offset?: parameters['offset'];
          /** Limiting and Pagination */
          limit?: parameters['limit'];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters['range'];
          /** Limiting and Pagination */
          'Range-Unit'?: parameters['rangeUnit'];
          /** Preference */
          Prefer?: parameters['preferCount'];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions['categories'][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** categories */
          categories?: definitions['categories'];
        };
        query: {
          /** Filtering Columns */
          select?: parameters['select'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters['rowFilter.categories.id'];
          created_at?: parameters['rowFilter.categories.created_at'];
          name?: parameters['rowFilter.categories.name'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters['rowFilter.categories.id'];
          created_at?: parameters['rowFilter.categories.created_at'];
          name?: parameters['rowFilter.categories.name'];
        };
        body: {
          /** categories */
          categories?: definitions['categories'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  '/merchants': {
    get: {
      parameters: {
        query: {
          id?: parameters['rowFilter.merchants.id'];
          created_at?: parameters['rowFilter.merchants.created_at'];
          name?: parameters['rowFilter.merchants.name'];
          address?: parameters['rowFilter.merchants.address'];
          phone?: parameters['rowFilter.merchants.phone'];
          email?: parameters['rowFilter.merchants.email'];
          /** Filtering Columns */
          select?: parameters['select'];
          /** Ordering */
          order?: parameters['order'];
          /** Limiting and Pagination */
          offset?: parameters['offset'];
          /** Limiting and Pagination */
          limit?: parameters['limit'];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters['range'];
          /** Limiting and Pagination */
          'Range-Unit'?: parameters['rangeUnit'];
          /** Preference */
          Prefer?: parameters['preferCount'];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions['merchants'][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** merchants */
          merchants?: definitions['merchants'];
        };
        query: {
          /** Filtering Columns */
          select?: parameters['select'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters['rowFilter.merchants.id'];
          created_at?: parameters['rowFilter.merchants.created_at'];
          name?: parameters['rowFilter.merchants.name'];
          address?: parameters['rowFilter.merchants.address'];
          phone?: parameters['rowFilter.merchants.phone'];
          email?: parameters['rowFilter.merchants.email'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters['rowFilter.merchants.id'];
          created_at?: parameters['rowFilter.merchants.created_at'];
          name?: parameters['rowFilter.merchants.name'];
          address?: parameters['rowFilter.merchants.address'];
          phone?: parameters['rowFilter.merchants.phone'];
          email?: parameters['rowFilter.merchants.email'];
        };
        body: {
          /** merchants */
          merchants?: definitions['merchants'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  '/vouchers': {
    get: {
      parameters: {
        query: {
          id?: parameters['rowFilter.vouchers.id'];
          created_at?: parameters['rowFilter.vouchers.created_at'];
          email?: parameters['rowFilter.vouchers.email'];
          timestamp?: parameters['rowFilter.vouchers.timestamp'];
          voucher?: parameters['rowFilter.vouchers.voucher'];
          fk_campaign_id?: parameters['rowFilter.vouchers.fk_campaign_id'];
          /** Filtering Columns */
          select?: parameters['select'];
          /** Ordering */
          order?: parameters['order'];
          /** Limiting and Pagination */
          offset?: parameters['offset'];
          /** Limiting and Pagination */
          limit?: parameters['limit'];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters['range'];
          /** Limiting and Pagination */
          'Range-Unit'?: parameters['rangeUnit'];
          /** Preference */
          Prefer?: parameters['preferCount'];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions['vouchers'][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** vouchers */
          vouchers?: definitions['vouchers'];
        };
        query: {
          /** Filtering Columns */
          select?: parameters['select'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters['rowFilter.vouchers.id'];
          created_at?: parameters['rowFilter.vouchers.created_at'];
          email?: parameters['rowFilter.vouchers.email'];
          timestamp?: parameters['rowFilter.vouchers.timestamp'];
          voucher?: parameters['rowFilter.vouchers.voucher'];
          fk_campaign_id?: parameters['rowFilter.vouchers.fk_campaign_id'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters['rowFilter.vouchers.id'];
          created_at?: parameters['rowFilter.vouchers.created_at'];
          email?: parameters['rowFilter.vouchers.email'];
          timestamp?: parameters['rowFilter.vouchers.timestamp'];
          voucher?: parameters['rowFilter.vouchers.voucher'];
          fk_campaign_id?: parameters['rowFilter.vouchers.fk_campaign_id'];
        };
        body: {
          /** vouchers */
          vouchers?: definitions['vouchers'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
}

export interface definitions {
  campaigns: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /** Format: text */
    name?: string;
    /** Format: text */
    description?: string;
    /** Format: numeric */
    price?: number;
    /** Format: json */
    localization?: string;
    /**
     * Format: bigint
     * @description Note:
     * This is a Foreign Key to `categories.id`.<fk table='categories' column='id'/>
     */
    fk_category_id?: number;
    /**
     * Format: bigint
     * @description Note:
     * This is a Foreign Key to `merchants.id`.<fk table='merchants' column='id'/>
     */
    fk_merchant_id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    date_start: string;
    /** Format: timestamp with time zone */
    date_end?: string;
    /** Format: boolean */
    published: boolean;
  };
  categories: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /** Format: text */
    name?: string;
  };
  merchants: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /** Format: text */
    name: string;
    /** Format: text */
    address?: string;
    /** Format: text */
    phone?: string;
    /** Format: text */
    email?: string;
  };
  vouchers: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /** Format: text */
    email?: string;
    /** Format: timestamp with time zone */
    timestamp?: string;
    /** Format: bigint */
    voucher?: number;
    /**
     * Format: bigint
     * @description Note:
     * This is a Foreign Key to `campaigns.id`.<fk table='campaigns' column='id'/>
     */
    fk_campaign_id?: number;
  };
}

export interface parameters {
  /**
   * @description Preference
   * @enum {string}
   */
  preferParams: 'params=single-object';
  /**
   * @description Preference
   * @enum {string}
   */
  preferReturn: 'return=representation' | 'return=minimal' | 'return=none';
  /**
   * @description Preference
   * @enum {string}
   */
  preferCount: 'count=none';
  /** @description Filtering Columns */
  select: string;
  /** @description On Conflict */
  on_conflict: string;
  /** @description Ordering */
  order: string;
  /** @description Limiting and Pagination */
  range: string;
  /**
   * @description Limiting and Pagination
   * @default items
   */
  rangeUnit: string;
  /** @description Limiting and Pagination */
  offset: string;
  /** @description Limiting and Pagination */
  limit: string;
  /** @description campaigns */
  'body.campaigns': definitions['campaigns'];
  /** Format: bigint */
  'rowFilter.campaigns.id': string;
  /** Format: timestamp with time zone */
  'rowFilter.campaigns.created_at': string;
  /** Format: text */
  'rowFilter.campaigns.name': string;
  /** Format: text */
  'rowFilter.campaigns.description': string;
  /** Format: numeric */
  'rowFilter.campaigns.price': string;
  /** Format: json */
  'rowFilter.campaigns.localization': string;
  /** Format: bigint */
  'rowFilter.campaigns.fk_category_id': string;
  /** Format: bigint */
  'rowFilter.campaigns.fk_merchant_id': string;
  /** Format: timestamp with time zone */
  'rowFilter.campaigns.date_start': string;
  /** Format: timestamp with time zone */
  'rowFilter.campaigns.date_end': string;
  /** Format: boolean */
  'rowFilter.campaigns.published': string;
  /** @description categories */
  'body.categories': definitions['categories'];
  /** Format: bigint */
  'rowFilter.categories.id': string;
  /** Format: timestamp with time zone */
  'rowFilter.categories.created_at': string;
  /** Format: text */
  'rowFilter.categories.name': string;
  /** @description merchants */
  'body.merchants': definitions['merchants'];
  /** Format: bigint */
  'rowFilter.merchants.id': string;
  /** Format: timestamp with time zone */
  'rowFilter.merchants.created_at': string;
  /** Format: text */
  'rowFilter.merchants.name': string;
  /** Format: text */
  'rowFilter.merchants.address': string;
  /** Format: text */
  'rowFilter.merchants.phone': string;
  /** Format: text */
  'rowFilter.merchants.email': string;
  /** @description vouchers */
  'body.vouchers': definitions['vouchers'];
  /** Format: bigint */
  'rowFilter.vouchers.id': string;
  /** Format: timestamp with time zone */
  'rowFilter.vouchers.created_at': string;
  /** Format: text */
  'rowFilter.vouchers.email': string;
  /** Format: timestamp with time zone */
  'rowFilter.vouchers.timestamp': string;
  /** Format: bigint */
  'rowFilter.vouchers.voucher': string;
  /** Format: bigint */
  'rowFilter.vouchers.fk_campaign_id': string;
}

export interface operations {}

export interface external {}
