window.fixtures = {
  documents: {
    french_vocab: {
      "id":"1-french-vocab",
      "title":"French Vocab","pages":62,"description":null,
      "source":null,"created_at":"Tue, 27 Aug 2013 22:16:05 +0000","updated_at":"Wed, 23 Oct 2013 17:40:10 +0000",
      "canonical_url":"http://dev.dcloud.org/documents/1-french-vocab.html","language":"eng",
      "contributor":"Testing Account","contributor_organization":"Testing Organization","display_language":"spa",
      "resources":{
        "pdf":"http://dev.dcloud.org/asset_store/documents/1/french-vocab.pdf",
        "text":"http://dev.dcloud.org/asset_store/documents/1/french-vocab.txt",
        "thumbnail":"http://dev.dcloud.org/asset_store/documents/1/pages/french-vocab-p1-thumbnail.gif",
        "search":"http://dev.dcloud.org/documents/1/search.json?q={query}",
        "print_annotations":"http://dev.dcloud.org/notes/print?docs[]=1",
        "annotations_url":"http://dev.dcloud.org/notes",
        "translations_url":"http://dev.dcloud.org/translations/{realm}/{language}",
        "page":{
          "image":"http://dev.dcloud.org/asset_store/documents/1/pages/french-vocab-p{page}-{size}.gif",
          "text":"http://dev.dcloud.org/documents/1/pages/french-vocab-p{page}.txt"}
      },
      "sections":[
        {"title":"Test Section #1","page":2}
      ],
      "annotations":[
        {
          "id":9,"title":"Nota sin T\u00edtulo","page":1,
          "location":{
            "image":"212,551,240,436"
          },
          "access":"public","content":"asdfasd"
        },{
          "id":5,"title":"A Testing note","page":1,
          "location":{
            "image":"344,612,483,401"
          },
          "access":"public","content":"<b>This is bold</b>.<i>This is italic</i>.  "
        },{
          "id":3,"title":"Vocab","page":6,
          "location":{
            "image":"93,666,159,354"
          },
          "access":"public","content":""
        },
        {
          "id":4,"title":"Page Note","page":15,
          "access":"public","content":""
        },
        {
          "id":2,"title":"Untitled Note","page":15,
          "location":{
            "image":"113,464,196,330"
          },
          "access":"public","content":""
        }
      ]
    }


  }

}
