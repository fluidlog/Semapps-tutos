import React, { useMemo } from 'react';
import { useListContext } from "react-admin";
import * as d3 from "d3";
import TreeGraph from './TreeGraph';

// if no endpoint data
const treeData =
  {
    data: {"id":"https://data.virtual-assembly.org/projects/assemblee-virtuelle",
    "type": ["og:Circle","pair:Organization","Organization"],
    "pair:label": "Assemblee-virtuelle"
    },
    children: [
      {
		      data: {"id":"https://data.virtual-assembly.org/groups/cercle-de-coordination1",
          "type": ["og:Circle"],
          "pair:label": "Cercle de coordination"
          },
          children : [
            {
              data: {"id":"https://data.virtual-assembly.org/groups/admin-et-compta",
                    "type": ["og:Circle"],
                    "pair:label": "admin-et-compta"
                  },
           },
            { data: {"id":"https://data.virtual-assembly.org/groups/communication",
                  "type": ["og:Circle"],
                  "pair:label": "Communication"
                },
           },
          ]
      },
      { data: {"id":"https://data.virtual-assembly.org/groups/conseil-d-administration",
            "type": ["og:Circle"],
            "pair:label": "Conseil d'Adminitration"
          },
       }
    ]
  };

  const flatData0 =
    [
      {"id":"https://data.meta.assemblee-virtuelle.org/organizations/assemblee-virtuelle",
      "type": ["og:Circle","pair:Organization","Organization"],
      "pair:label": "Assemblee-virtuelle",
      "pair:partnerOf": ["https://data.meta.assemblee-virtuelle.org/organizations/colibris",
      "https://data.meta.assemblee-virtuelle.org/organizations/data-food-consortium",
      "https://data.meta.assemblee-virtuelle.org/organizations/data-players"]
      },
      {"id":"https://data.meta.assemblee-virtuelle.org/organizations/colibris",
      "type": ["og:Circle","pair:Organization","Organization"],
      "pair:label": "Colibris",
      "pair:partnerOf": "https://data.meta.assemblee-virtuelle.org/organizations/assemblee-virtuelle"
      },
      {"id":"https://data.meta.assemblee-virtuelle.org/organizations/data-food-consortium",
      "type": ["og:Circle","pair:Organization","Organization"],
      "pair:label": "DATA FOOD CONSORTIUM",
      "pair:partnerOf": "https://data.meta.assemblee-virtuelle.org/organizations/assemblee-virtuelle"
      },
      {"id":"https://data.meta.assemblee-virtuelle.org/organizations/data-players",
      "type": ["og:Circle","pair:Organization","Organization"],
      "pair:label": "DATA PLAYERS",
      "pair:partnerOf": "https://data.meta.assemblee-virtuelle.org/organizations/assemblee-virtuelle"
      },
    ];

const LaunchGraph = () => {
    const { ids, data, loading, basePath } = useListContext();

    console.log("data", data )
    const flat_data = Object.values(data)

    flat_data.forEach((item, i) => {
      if (item.id == "https://data.meta.assemblee-virtuelle.org/organizations/assemblee-virtuelle")
        item["pair:partnerOf"] = "";
    });

    console.log("flatData", flat_data )

    const rootData = useMemo(() => {
      if( !loading && ids.length > 0 ) {
        const mystratify = d3.stratify()
          .id(d => d.id)
          .parentId(d => d['pair:partnerOf'])

        return mystratify(flat_data);
      }
    }, [ids, data, loading]);

  return (
    <TreeGraph root_data={rootData}></TreeGraph>
  );
}

export default LaunchGraph;
