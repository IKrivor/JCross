function SplitMass(){
    var target = [];
    var n, m, response;
    var request = new XMLHttpRequest();
    request.open('GET', 'document.json');
    request.onreadystatechange = function(e) {
        if (this.readyState == 4) {
            if (this.status == 200) {
                response = JSON.parse(this.responseText);
                //response = JSON.parse(response);
                for(i=0;i<response.name.length;i++)
                {
                    if(response.name[i]==',')
                        n++;

                }
                for (j=0; response.name!=',';j++)
                {
                    m=j;
                }
                n++;
                target = [n][m];
                var k = 0, j=0;
                for (i=0; i< response.name.length;i++)
                {
                    if(response.name[i]!=',')
                    {
                        target[j][k]=response.name[i];
                        k++;
                    }
                    else
                    {
                        j++;
                        k=0;
                    }
                }

            }
        }
    }
    request.send(null);
}