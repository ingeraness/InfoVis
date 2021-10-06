import pandas as pd

hfi_cc_df = pd.read_csv("src/hfi_cc_2020.csv", delimiter=',', encoding='latin1')

data = hfi_cc_df[['ISO_code', 'year', 'countries', 'region', 'hf_score', 'hf_rank', 'pf_ss_disappearances_violent', 'pf_ss', 'pf_ss_women', 'ef_legal_police']]
#data[data['region']=="Europe"]

#data.loc[data['region'] == 'Europe']

europe_df = data.loc[data['region'].isin(['Eastern Europe', 'Western Europe'])]

europe_df.dropna(subset=['hf_score'], inplace=True)
europe_df.dropna(subset=['ef_legal_police'], inplace=True)

print(europe_df)

europe_df.to_csv('data.csv', index=False, header=True)